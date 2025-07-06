import { test, expect } from '@jest/globals'
import type { ExtensionDetailButton } from '../src/parts/GetExtensionDetailButtons/ExtensionDetailButton.ts'
import { getExtensionDetailButtons } from '../src/parts/GetExtensionDetailButtons/GetExtensionDetailButtons.ts'

test('returns all buttons when extension has color themes and is not builtin', () => {
  const extension = {
    colorThemes: [{ label: 'Dark' }],
    builtin: false,
  }
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Set Color Theme', onClick: 'handleClickSetColorTheme' },
    { label: 'Disable', onClick: 'handleClickDisable' },
    { label: 'Uninstall', onClick: 'handleClickUninstall' },
  ])
})

test('returns only disable and uninstall when no color themes and not builtin', () => {
  const extension = {
    colorThemes: [],
    builtin: false,
  }
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Disable', onClick: 'handleClickDisable' },
    { label: 'Uninstall', onClick: 'handleClickUninstall' },
  ])
})

test('returns only disable when extension is builtin', () => {
  const extension = {
    colorThemes: [],
    builtin: true,
  }
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Disable', onClick: 'handleClickDisable' },
  ])
})

test('returns only disable and uninstall when extension is null', () => {
  const extension = null
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Disable', onClick: 'handleClickDisable' },
    { label: 'Uninstall', onClick: 'handleClickUninstall' },
  ])
})

test('returns disable and uninstall when extension has no builtin property', () => {
  const extension = {
    colorThemes: [],
  }
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Disable', onClick: 'handleClickDisable' },
    { label: 'Uninstall', onClick: 'handleClickUninstall' },
  ])
})