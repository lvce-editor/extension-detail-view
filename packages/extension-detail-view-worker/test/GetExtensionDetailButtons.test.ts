import { test, expect } from '@jest/globals'
import type { ExtensionDetailButton } from '../src/parts/GetExtensionDetailButtons/ExtensionDetailButton.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getExtensionDetailButtons } from '../src/parts/GetExtensionDetailButtons/GetExtensionDetailButtons.ts'

test('returns all buttons when extension has color themes and is not builtin', () => {
  const extension = {
    colorThemes: [{ label: 'Dark' }],
    builtin: false,
  }
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Set Color Theme', onClick: 'handleClickSetColorTheme', enabled: true },
    { label: ExtensionDetailStrings.disable(), onClick: 'handleClickDisable', enabled: true },
    { label: ExtensionDetailStrings.uninstall(), onClick: 'handleClickUninstall', enabled: true },
  ])
})

test('returns all buttons when no color themes and not builtin', () => {
  const extension = {
    colorThemes: [],
    builtin: false,
  }
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Set Color Theme', onClick: 'handleClickSetColorTheme', enabled: false },
    { label: ExtensionDetailStrings.disable(), onClick: 'handleClickDisable', enabled: true },
    { label: ExtensionDetailStrings.uninstall(), onClick: 'handleClickUninstall', enabled: true },
  ])
})

test('returns all buttons when extension is builtin', () => {
  const extension = {
    colorThemes: [],
    builtin: true,
  }
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Set Color Theme', onClick: 'handleClickSetColorTheme', enabled: false },
    { label: ExtensionDetailStrings.disable(), onClick: 'handleClickDisable', enabled: true },
    { label: ExtensionDetailStrings.uninstall(), onClick: 'handleClickUninstall', enabled: false },
  ])
})

test('returns all buttons when extension is null', () => {
  const extension = null
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Set Color Theme', onClick: 'handleClickSetColorTheme', enabled: false },
    { label: ExtensionDetailStrings.disable(), onClick: 'handleClickDisable', enabled: true },
    { label: ExtensionDetailStrings.uninstall(), onClick: 'handleClickUninstall', enabled: true },
  ])
})

test('returns all buttons when extension has no builtin property', () => {
  const extension = {
    colorThemes: [],
  }
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Set Color Theme', onClick: 'handleClickSetColorTheme', enabled: false },
    { label: ExtensionDetailStrings.disable(), onClick: 'handleClickDisable', enabled: true },
    { label: ExtensionDetailStrings.uninstall(), onClick: 'handleClickUninstall', enabled: true },
  ])
})