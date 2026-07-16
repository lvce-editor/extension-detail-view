import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleColorThemeChanged } from '../src/parts/HandleColorThemeChanged/HandleColorThemeChanged.ts'

test('shows set color theme button when another color theme becomes active', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    currentColorThemeId: 'cobalt2',
    extension: {
      builtin: true,
      colorThemes: [{ id: 'cobalt2', label: 'Cobalt 2' }],
    },
    hasColorTheme: true,
  }

  const result = handleColorThemeChanged(state, 'slime')

  expect(result.currentColorThemeId).toBe('slime')
  expect(result.buttons.some((button) => button.name === 'SetColorTheme')).toBe(true)
})

test('hides set color theme button when extension color theme becomes active', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    extension: {
      colorThemes: [{ id: 'cobalt2', label: 'Cobalt 2' }],
    },
    hasColorTheme: true,
  }

  const result = handleColorThemeChanged(state, 'cobalt2')

  expect(result.currentColorThemeId).toBe('cobalt2')
  expect(result.buttons.some((button) => button.name === 'SetColorTheme')).toBe(false)
})

test('returns the same state when the color theme did not change', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    currentColorThemeId: 'cobalt2',
  }

  const result = handleColorThemeChanged(state, 'cobalt2')

  expect(result).toBe(state)
})
