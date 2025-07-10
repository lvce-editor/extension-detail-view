import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickSetColorTheme from '../src/parts/HandleClickSetColorTheme/HandleClickSetColorTheme.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

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
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'ColorTheme.setColorTheme') {
        return 'theme1'
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = CreateDefaultState.createDefaultState({
    extension: {
      colorThemes: [{ id: 'theme1', label: 'Theme 1' }],
    },
  })

  const result = await HandleClickSetColorTheme.handleClickSetColorTheme(state)
  expect(result).toBe(state)
})

test('handleClickSetColorTheme - extension without color theme', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = CreateDefaultState.createDefaultState({
    extension: {},
  })

  const result = await HandleClickSetColorTheme.handleClickSetColorTheme(state)
  expect(result).toBe(state)
})

test('handleClickSetColorTheme - extension with empty color themes', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = CreateDefaultState.createDefaultState({
    extension: {
      colorThemes: [],
    },
  })

  const result = await HandleClickSetColorTheme.handleClickSetColorTheme(state)
  expect(result).toBe(state)
})
