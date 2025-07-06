import { test, expect } from '@jest/globals'
import { getExtensionDetailButtons } from '../src/parts/GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import type { ExtensionDetailButton } from '../src/parts/GetExtensionDetailButtons/ExtensionDetailButton.ts'

test('returns all buttons when extension has color themes', () => {
  const extension = {
    colorThemes: [{ label: 'Dark' }],
  }
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Set Color Theme', onClick: 'handleClickSetColorTheme' },
    { label: 'Disable', onClick: 'handleClickDisable' },
    { label: 'Uninstall', onClick: 'handleClickUninstall' },
  ])
})

test('returns only disable and uninstall when no color themes', () => {
  const extension = {
    colorThemes: [],
  }
  const result: readonly ExtensionDetailButton[] = getExtensionDetailButtons(extension)
  expect(result).toEqual([
    { label: 'Disable', onClick: 'handleClickDisable' },
    { label: 'Uninstall', onClick: 'handleClickUninstall' },
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