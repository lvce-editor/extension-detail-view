import { expect, test } from '@jest/globals'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as SetColorTheme from '../src/parts/SetColorTheme/SetColorTheme.ts'

test('set color theme', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.setColorTheme': () => {
      return 'theme-id'
    },
  })

  const result = await SetColorTheme.setColorTheme('test-id')
  expect(result).toBe('theme-id')
  expect(mockRpc.invocations).toEqual([['ColorTheme.setColorTheme', 'test-id']])
})

test('handles error during set color theme', async () => {
  const error = new Error('Failed to set color theme')
  const mockRpc = RendererWorker.registerMockRpc({
    'ColorTheme.setColorTheme': () => {
      throw error
    },
  })

  await expect(SetColorTheme.setColorTheme('test-id')).rejects.toThrow('Failed to set color theme')
})
