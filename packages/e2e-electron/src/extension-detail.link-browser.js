import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const captureStartupDiagnostics = async (page, events) => {
  const pageState = await page
    .evaluate(() => ({
      url: location.href,
      readyState: document.readyState,
      title: document.title,
      bodyText: document.body?.innerText.slice(0, 3000) ?? '',
      bodyHtml: document.body?.innerHTML.slice(0, 5000) ?? '',
    }))
    .catch((error) => ({ evaluateError: String(error) }))

  const diagnostics = {
    attempt: process.env.E2E_ATTEMPT ?? 'unknown',
    capturedAt: new Date().toISOString(),
    pageUrl: page.url(),
    pageState,
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
    await page.screenshot({ path: join(directory, `startup-attempt-${attempt}.png`), timeout: 2000 })
  } catch (error) {
    console.log(`[electron startup diagnostics] failed to save screenshot: ${String(error)}`)
  }
}

export const test = async ({ page, expect }) => {
  const events = []
  const recordEvent = (name, data = {}) => {
    if (events.length < 100) {
      events.push({ name, at: Date.now(), ...data })
    }
  }

  page.on('console', (message) =>
    recordEvent('console', { type: message.type(), text: message.text().slice(0, 1000) }),
  )
  page.on('pageerror', (error) =>
    recordEvent('pageerror', { message: error.message, stack: error.stack?.slice(0, 2000) }),
  )
  page.on('requestfailed', (request) =>
    recordEvent('requestfailed', { url: request.url(), error: request.failure()?.errorText }),
  )
  page.on('framenavigated', (frame) => recordEvent('framenavigated', { url: frame.url() }))
  page.on('domcontentloaded', () => recordEvent('domcontentloaded'))
  page.on('load', () => recordEvent('load'))
  page.on('crash', () => recordEvent('crash'))

  try {
    await expect(page.locator('.Main')).toBeVisible()
  } catch (error) {
    await captureStartupDiagnostics(page, events)
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
