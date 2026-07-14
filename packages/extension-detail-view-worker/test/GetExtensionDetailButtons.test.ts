import { test, expect } from '@jest/globals'
import type { ExtensionDetailButton } from '../src/parts/GetExtensionDetailButtons/ExtensionDetailButton.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getExtensionDetailButtons } from '../src/parts/GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test.skip('returns all buttons when extension has color themes and is not builtin', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(true, false, false, 'theme-1', 'Theme 1', '')
  expect(result).toEqual([
    { enabled: true, label: 'Set Color Theme', name: InputName.SetColorTheme, onClick: 'handleClickSetColorTheme' },
    {
      enabled: false,
      label: 'Enable',
      name: 'Enable',
      onClick: 'handleClickEnable',
    },
    { enabled: true, label: ExtensionDetailStrings.disable(), name: InputName.Disable, onClick: 'handleClickDisable' },
    { enabled: true, label: ExtensionDetailStrings.uninstall(), name: InputName.Uninstall, onClick: 'handleClickUninstall' },
  ])
})

test.skip('returns all buttons when no color themes and not builtin', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(false, false, false, '', '', '')
  expect(result).toEqual([
    { enabled: false, label: 'Set Color Theme', name: InputName.SetColorTheme, onClick: 'handleClickSetColorTheme' },
    {
      enabled: false,
      label: 'Enable',
      name: 'Enable',
      onClick: 'handleClickEnable',
    },
    { enabled: true, label: ExtensionDetailStrings.disable(), name: InputName.Disable, onClick: 'handleClickDisable' },
    { enabled: true, label: ExtensionDetailStrings.uninstall(), name: InputName.Uninstall, onClick: 'handleClickUninstall' },
  ])
})

test.skip('returns all buttons when extension is builtin', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(false, true, false, '', '', '')
  expect(result).toEqual([
    { enabled: false, label: 'Set Color Theme', name: InputName.SetColorTheme, onClick: 'handleClickSetColorTheme' },
    {
      enabled: false,
      label: 'Enable',
      name: 'Enable',
      onClick: 'handleClickEnable',
    },
    { enabled: true, label: ExtensionDetailStrings.disable(), name: InputName.Disable, onClick: 'handleClickDisable' },
    { enabled: false, label: ExtensionDetailStrings.uninstall(), name: InputName.Uninstall, onClick: 'handleClickUninstall' },
  ])
})

test('set color theme button is not shown when extension is disabled', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(true, false, true, 'theme-1', 'Theme 1', '')
  const setColorThemeButton = result.find((button) => button.name === InputName.SetColorTheme)
  expect(setColorThemeButton).toBeUndefined()
})

test('set color theme button is not shown when extension theme is active', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(true, false, false, 'slime-theme', 'Slime Theme', 'slime-theme')
  const setColorThemeButton = result.find((button) => button.name === InputName.SetColorTheme)
  expect(setColorThemeButton).toBeUndefined()
})

test('set color theme button is shown when extension theme differs from active theme', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(true, false, false, 'slime-theme', 'Slime Theme', 'other-theme')
  const setColorThemeButton = result.find((button) => button.name === InputName.SetColorTheme)
  expect(setColorThemeButton).toBeDefined()
})

test('set color theme button is not shown when active theme matches extension label', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(true, false, false, 'slime-theme', 'Slime Theme', 'Slime Theme')
  const setColorThemeButton = result.find((button) => button.name === InputName.SetColorTheme)
  expect(setColorThemeButton).toBeUndefined()
})

test('enable button previews color theme on hover', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(true, false, true, 'slime-theme', 'Slime Theme', 'other-theme')
  const enableButton = result.find((button) => button.name === InputName.Enable)
  expect(enableButton).toEqual({
    enabled: true,
    label: ExtensionDetailStrings.enable(),
    name: InputName.Enable,
    onClick: 3,
    onMouseEnter: 20,
    onMouseLeave: 21,
  })
})
