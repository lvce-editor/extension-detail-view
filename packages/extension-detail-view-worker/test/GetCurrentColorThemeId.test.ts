import { test, expect } from '@jest/globals'
import { getCurrentColorTheme } from '../src/parts/GetCurrentColorThemeId/GetCurrentColorThemeId.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test('getCurrentColorTheme returns preference value', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => 'dark-theme',
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('dark-theme')
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'workbnech.colorTheme']])
})

test('getCurrentColorTheme returns empty string when preference is null', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => null,
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'workbnech.colorTheme']])
})

test('getCurrentColorTheme returns empty string when preference is undefined', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => undefined,
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'workbnech.colorTheme']])
})
