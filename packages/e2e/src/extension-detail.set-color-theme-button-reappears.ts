import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.set-color-theme-button-reappears'

export const test: Test = async ({ ColorTheme, expect, ExtensionDetail, Locator, QuickPick }) => {
  // arrange
  await ColorTheme.setColorTheme('slime')
  await ExtensionDetail.open('builtin.theme-cobalt2')
  const setColorThemeButton = Locator('.Button[name="SetColorTheme"]')
  await expect(setColorThemeButton).toBeVisible()
  await ExtensionDetail.handleClickSetColorTheme()
  await expect(setColorThemeButton).toBeHidden()

  // act
  await QuickPick.executeCommand('>Preferences: Color Theme')
  await QuickPick.selectItem('slime')

  // assert
  await expect(setColorThemeButton).toBeVisible()
}
