import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const captureStartupDiagnostics = async (page, electronApp, events) => {
  const pageState = await page
    .evaluate(() => {
      let remainingNodes = 300
      const snapshotNode = (node, depth = 0) => {
        if (remainingNodes <= 0 || depth > 12) {
          return '[snapshot limit]'
        }
        remainingNodes--
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent?.trim().slice(0, 200) ?? ''
        }
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return node.nodeName
        }
        const element = node
        const result = {
          tagName: element.tagName,
          id: element.id,
          className: String(element.className).slice(0, 300),
        }
        if (element.shadowRoot) {
          result.shadowRoot = Array.from(element.shadowRoot.childNodes, (child) => snapshotNode(child, depth + 1))
        }
        if (element.childNodes.length > 0) {
          result.children = Array.from(element.childNodes, (child) => snapshotNode(child, depth + 1))
        }
        return result
      }
      return {
        url: location.href,
        readyState: document.readyState,
        title: document.title,
        bodyText: document.body?.innerText.slice(0, 3000) ?? '',
        bodyHtml: document.body?.innerHTML.slice(0, 5000) ?? '',
        fontsStatus: document.fonts?.status,
        fontsCount: document.fonts?.size,
        scripts: Array.from(document.scripts, (script) => script.src).slice(0, 100),
        domTree: document.documentElement ? snapshotNode(document.documentElement) : null,
      }
    })
    .catch((error) => ({ evaluateError: String(error) }))

  const browserWindows = await Promise.all(
    electronApp.windows().map(async (window, index) => ({
      index,
      url: window.url(),
      pageState: await window
        .evaluate(() => ({
          readyState: document.readyState,
          title: document.title,
          bodyHtml: document.body?.innerHTML.slice(0, 5000) ?? '',
          documentHtml: document.documentElement?.innerHTML.slice(0, 5000) ?? '',
          scripts: Array.from(document.scripts, (script) => script.src).slice(0, 100),
        }))
        .catch((error) => ({ evaluateError: String(error) })),
    })),
  )

  const frames = await Promise.all(
    page.frames().map(async (frame, index) => ({
      index,
      url: frame.url(),
      pageState: await frame
        .evaluate(() => ({
          readyState: document.readyState,
          title: document.title,
          bodyHtml: document.body?.innerHTML.slice(0, 5000) ?? '',
        }))
        .catch((error) => ({ evaluateError: String(error) })),
    })),
  )

  const rendererMainUrl = pageState.scripts?.find((url) => url.includes('rendererProcessMain'))
  if (rendererMainUrl) {
    pageState.rendererMainReady = await page
      .evaluate(async (url) => {
        try {
          const rendererMain = await import(url)
          return await Promise.race([
            rendererMain.ready.then(
              () => ({ status: 'resolved' }),
              (error) => ({ status: 'rejected', error: String(error) }),
            ),
            new Promise((resolve) => setTimeout(() => resolve({ status: 'pending-after-100ms' }), 100)),
          ])
        } catch (error) {
          return { status: 'import-failed', error: String(error) }
        }
      }, rendererMainUrl)
      .catch((error) => ({ status: 'evaluate-failed', error: String(error) }))
  }

  const diagnostics = {
    attempt: process.env.E2E_ATTEMPT ?? 'unknown',
    capturedAt: new Date().toISOString(),
    pageUrl: page.url(),
    pageState,
    browserWindows,
    frames,
    events,
  }

  console.log(`[electron startup diagnostics] ${JSON.stringify(diagnostics)}`)

  const directory = process.env.E2E_DIAGNOSTICS_DIR
  if (!directory) {
    return
  }

  const attempt = process.env.E2E_ATTEMPT ?? 'unknown'
  try {
    await writeFile(join(directory, `startup-attempt-${attempt}.json`), JSON.stringify(diagnostics, null, 2))
  } catch (error) {
    console.log(`[electron startup diagnostics] failed to save JSON: ${String(error)}`)
  }

  try {
    await page.screenshot({ path: join(directory, `startup-attempt-${attempt}.png`), timeout: 5000 })
  } catch (error) {
    console.log(`[electron startup diagnostics] failed to save screenshot: ${String(error)}`)
  }
}

export const test = async ({ electronApp, page, expect }) => {
  const events = []
  const recordEvent = (name, data = {}) => {
    if (events.length < 100) {
      events.push({ name, at: Date.now(), ...data })
    }
  }

  page.on('console', (message) => recordEvent('console', { type: message.type(), text: message.text().slice(0, 1000) }))
  page.on('pageerror', (error) => recordEvent('pageerror', { message: error.message, stack: error.stack?.slice(0, 2000) }))
  page.on('requestfailed', (request) => recordEvent('requestfailed', { url: request.url(), error: request.failure()?.errorText }))
  page.on('framenavigated', (frame) => recordEvent('framenavigated', { url: frame.url() }))
  page.on('domcontentloaded', () => recordEvent('domcontentloaded'))
  page.on('load', () => recordEvent('load'))
  page.on('crash', () => recordEvent('crash'))

  try {
    await expect(page.locator('.Main')).toBeVisible()
  } catch (error) {
    await captureStartupDiagnostics(page, electronApp, events)
    throw error
  }

  await page.evaluate(async () => {
    const { executeCommand } = await import(document.querySelector('script[src*="rendererProcessMain"]').src)
    await executeCommand('Preferences.update', { 'application.linkProtectionEnabled': false, 'extensions.linkBrowser': 'simpleBrowser' })
    await executeCommand('Main.openUri', 'extension-detail:///builtin.theme-gruvbox')
  })
  await expect(page.locator('.ExtensionDetail')).toBeVisible()
  await page.locator('.ExtensionDetail .Resource').filter({ hasText: 'Repository' }).click({ noWaitAfter: true })
  await expect(page.locator('.SimpleBrowser')).toBeVisible()
  await expect(page.locator('.SimpleBrowserAddressBar input')).toHaveValue('https://github.com/lvce-editor/theme-gruvbox')
}
