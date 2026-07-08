import { afterEach, expect, jest, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleMouseLeaveEnable from '../src/parts/HandleMouseLeaveEnable/HandleMouseLeaveEnable.ts'

afterEach(() => {
  jest.restoreAllMocks()
})

test('handleMouseLeaveEnable disables color theme preview', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.disablePreviewColorTheme': () => {},
  })

  const state = CreateDefaultState.createDefaultState()
  const result = await HandleMouseLeaveEnable.handleMouseLeaveEnable(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ColorTheme.disablePreviewColorTheme']])
})

test('handleMouseLeaveEnable handles restore error gracefully', async () => {
  const error = new Error('Failed to restore color theme')
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
  using mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.disablePreviewColorTheme': () => {
      throw error
    },
  })

  const state = CreateDefaultState.createDefaultState()
  const result = await HandleMouseLeaveEnable.handleMouseLeaveEnable(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ColorTheme.disablePreviewColorTheme']])
  expect(warn).toHaveBeenCalledWith(error)
})
