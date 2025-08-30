import { test, expect } from '@jest/globals'
import type { ExtensionDetailButton } from '../src/parts/GetExtensionDetailButtons/ExtensionDetailButton.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getExtensionDetailButtons } from '../src/parts/GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test.skip('returns all buttons when extension has color themes and is not builtin', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(true, false, false)
  expect(result).toEqual([
    { label: 'Set Color Theme', onClick: 'handleClickSetColorTheme', enabled: true, name: InputName.SetColorTheme },
    {
      enabled: false,
      label: 'Enable',
      name: 'Enable',
      onClick: 'handleClickEnable',
    },
    { label: ExtensionDetailStrings.disable(), onClick: 'handleClickDisable', enabled: true, name: InputName.Disable },
    { label: ExtensionDetailStrings.uninstall(), onClick: 'handleClickUninstall', enabled: true, name: InputName.Uninstall },
  ])
})

test.skip('returns all buttons when no color themes and not builtin', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(false, false, false)
  expect(result).toEqual([
    { label: 'Set Color Theme', onClick: 'handleClickSetColorTheme', enabled: false, name: InputName.SetColorTheme },
    {
      enabled: false,
      label: 'Enable',
      name: 'Enable',
      onClick: 'handleClickEnable',
    },
    { label: ExtensionDetailStrings.disable(), onClick: 'handleClickDisable', enabled: true, name: InputName.Disable },
    { label: ExtensionDetailStrings.uninstall(), onClick: 'handleClickUninstall', enabled: true, name: InputName.Uninstall },
  ])
})

test.skip('returns all buttons when extension is builtin', () => {
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(false, true, false)
  expect(result).toEqual([
    { label: 'Set Color Theme', onClick: 'handleClickSetColorTheme', enabled: false, name: InputName.SetColorTheme },
    {
      enabled: false,
      label: 'Enable',
      name: 'Enable',
      onClick: 'handleClickEnable',
    },
    { label: ExtensionDetailStrings.disable(), onClick: 'handleClickDisable', enabled: true, name: InputName.Disable },
    { label: ExtensionDetailStrings.uninstall(), onClick: 'handleClickUninstall', enabled: false, name: InputName.Uninstall },
  ])
})
