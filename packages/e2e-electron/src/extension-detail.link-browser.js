export const test = async ({ page, expect }) => {
  await expect(page.locator('.Main')).toBeVisible()
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
