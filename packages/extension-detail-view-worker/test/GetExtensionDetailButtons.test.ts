import { test, expect } from '@jest/globals'
import type { ExtensionDetailButton } from '../src/parts/GetExtensionDetailButtons/ExtensionDetailButton.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getExtensionDetailButtons } from '../src/parts/GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test.skip('returns all buttons when extension has color themes and is not builtin', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(true, false, false)
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
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(false, false, false)
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
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(false, true, false)
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
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(true, false, true)
  const setColorThemeButton = result.find((button) => button.name === InputName.SetColorTheme)
  expect(setColorThemeButton).toBeUndefined()
})
