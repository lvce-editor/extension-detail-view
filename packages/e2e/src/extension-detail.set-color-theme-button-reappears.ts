import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.set-color-theme-button-reappears'

export const skip = 1

export const test: Test = async ({ Command, expect, ExtensionDetail, Locator, QuickPick }) => {
  // arrange
  await Command.execute('ColorTheme.setColorTheme', 'slime')
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
