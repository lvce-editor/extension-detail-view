import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickSetColorTheme from '../src/parts/HandleClickSetColorTheme/HandleClickSetColorTheme.ts'

test('getColorThemeId - extension with color themes', () => {
  const extension = {
    colorThemes: [
      { id: 'theme1', label: 'Theme 1' },
      { id: 'theme2', label: 'Theme 2' },
    ],
  }
  const result = HandleClickSetColorTheme.getColorThemeId(extension)
  expect(result).toBe('theme1')
})

test('getColorThemeId - extension with color themes without id', () => {
  const extension = {
    colorThemes: [{ label: 'Theme 1' }, { label: 'Theme 2' }],
  }
  const result = HandleClickSetColorTheme.getColorThemeId(extension)
  expect(result).toBe('Theme 1')
})

test('getColorThemeId - extension without color themes', () => {
  const extension = {
    otherProperty: 'value',
  }
  const result = HandleClickSetColorTheme.getColorThemeId(extension)
  expect(result).toBeUndefined()
})

test('getColorThemeId - extension with empty color themes array', () => {
  const extension = {
    colorThemes: [],
  }
  const result = HandleClickSetColorTheme.getColorThemeId(extension)
  expect(result).toBeUndefined()
})

test('getColorThemeId - null extension', () => {
  const result = HandleClickSetColorTheme.getColorThemeId(null)
  expect(result).toBeUndefined()
})

test('getColorThemeId - undefined extension', () => {
  const result = HandleClickSetColorTheme.getColorThemeId(undefined)
  expect(result).toBeUndefined()
})

test('handleClickSetColorTheme - extension with color theme', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.setColorTheme': () => {
      return ''
    },
    confirm: () => {
      return ''
    },
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    extension: {
      colorThemes: [{ id: 'theme1', label: 'Theme 1' }],
    },
  }

  const result = await HandleClickSetColorTheme.handleClickSetColorTheme(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ColorTheme.setColorTheme', 'theme1']])
})

test('handleClickSetColorTheme - extension without color theme', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const state = {
    ...CreateDefaultState.createDefaultState(),
    extension: {},
  }

  const result = await HandleClickSetColorTheme.handleClickSetColorTheme(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleClickSetColorTheme - extension with empty color themes', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const state = {
    ...CreateDefaultState.createDefaultState(),
    extension: {
      colorThemes: [],
    },
  }

  const result = await HandleClickSetColorTheme.handleClickSetColorTheme(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleClickSetColorTheme - extension with color theme error', async () => {
  const errorMessage = 'Failed to set color theme'
  const mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.setColorTheme': () => {
      return errorMessage
    },
    confirm: () => {
      return ''
    },
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    extension: {
      colorThemes: [{ id: 'theme1', label: 'Theme 1' }],
    },
  }

  const result = await HandleClickSetColorTheme.handleClickSetColorTheme(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['ColorTheme.setColorTheme', 'theme1'],
    ['confirm', errorMessage],
  ])
})
