export const test = async ({ page, expect }) => {
  await expect(page.locator('.Main')).toBeVisible()
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.evaluate(async () => {
    const { executeCommand } = await import(document.querySelector('script[src*="rendererProcessMain"]').src)
    await executeCommand('Preferences.update', { 'window.titleBarStyle': 'custom' })
    await executeCommand('Layout.hideSideBar')
    await executeCommand('Main.openUri', 'extension-detail:///builtin.theme-gruvbox')
  })

  const heading = page.locator('.ExtensionDetail .Markdown h1')
  await expect(heading).toBeVisible()
  const selectedText = await heading.innerText()
  await page.evaluate(() => {
    const heading = document.querySelector('.ExtensionDetail .Markdown h1')
    const range = document.createRange()
    range.selectNodeContents(heading)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  })

  await heading.click({ button: 'right' })
  const menu = page.locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = menu.locator('.MenuItem')
  await expect(menuItems).toHaveCount(3)
  await expect(menuItems.nth(0)).toHaveAttribute('aria-disabled', 'true')
  await expect(menuItems.nth(1)).toHaveText('Copy')
  await expect(menuItems.nth(2)).toHaveAttribute('aria-disabled', 'true')
  await menuItems.nth(1).click()
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(selectedText)
}
