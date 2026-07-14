import { afterEach, expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleMouseEnterEnable from '../src/parts/HandleMouseEnterEnable/HandleMouseEnterEnable.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('handleMouseEnterEnable previews extension color theme', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.previewColorTheme': () => {},
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    extension: {
      colorThemes: [{ id: 'theme1', label: 'Theme 1' }],
    },
  }

  const result = await HandleMouseEnterEnable.handleMouseEnterEnable(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ColorTheme.previewColorTheme', 'theme1']])
})

test('handleMouseEnterEnable does nothing without color theme', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  const state = {
    ...CreateDefaultState.createDefaultState(),
    extension: {},
  }

  const result = await HandleMouseEnterEnable.handleMouseEnterEnable(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleMouseEnterEnable handles preview error gracefully', async () => {
  const error = new Error('Color theme not found')
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.previewColorTheme': () => {
      throw error
    },
  })

  const state = {
    ...CreateDefaultState.createDefaultState(),
    extension: {
      colorThemes: [{ id: 'missing-theme', label: 'Missing Theme' }],
    },
  }

  const result = await HandleMouseEnterEnable.handleMouseEnterEnable(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ColorTheme.previewColorTheme', 'missing-theme']])
  expect(warn).toHaveBeenCalledWith(error)
})
