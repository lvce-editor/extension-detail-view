import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getCurrentColorTheme } from '../src/parts/GetCurrentColorThemeId/GetCurrentColorThemeId.ts'

test('getCurrentColorTheme returns preference value', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => 'dark-theme',
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('dark-theme')
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'workbnech.colorTheme']])
})

test('getCurrentColorTheme returns empty string when preference is null', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => null,
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'workbnech.colorTheme']])
})

test('getCurrentColorTheme returns empty string when preference is undefined', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => undefined,
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'workbnech.colorTheme']])
})
