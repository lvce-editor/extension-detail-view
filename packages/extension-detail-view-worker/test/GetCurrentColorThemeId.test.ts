import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getCurrentColorTheme } from '../src/parts/GetCurrentColorThemeId/GetCurrentColorThemeId.ts'

test('getCurrentColorTheme returns preference value', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => 'dark-theme',
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('dark-theme')
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'workbench.colorTheme']])
})

test('getCurrentColorTheme returns empty string when preference is null', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => null,
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([
    ['Preferences.get', 'workbench.colorTheme'],
    ['Preferences.getAll'],
    ['Preferences.get', 'workbnech.colorTheme'],
  ])
})

test('getCurrentColorTheme returns empty string when preference is undefined', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => undefined,
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([
    ['Preferences.get', 'workbench.colorTheme'],
    ['Preferences.getAll'],
    ['Preferences.get', 'workbnech.colorTheme'],
  ])
})

test('getCurrentColorTheme returns the current theme from all preferences', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => undefined,
    'Preferences.getAll': () => ({
      'workbench.colorTheme': 'all-preferences-theme',
    }),
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('all-preferences-theme')
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'workbench.colorTheme'], ['Preferences.getAll']])
})

test('getCurrentColorTheme returns the legacy theme from all preferences', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => undefined,
    'Preferences.getAll': () => ({
      'workbnech.colorTheme': 'legacy-all-preferences-theme',
    }),
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('legacy-all-preferences-theme')
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'workbench.colorTheme'], ['Preferences.getAll']])
})

test('getCurrentColorTheme returns the legacy preference value', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': (key: string) => {
      return key === 'workbnech.colorTheme' ? 'legacy-theme' : undefined
    },
    'Preferences.getAll': () => ({}),
  })
  const result = await getCurrentColorTheme()
  expect(result).toBe('legacy-theme')
  expect(mockRpc.invocations).toEqual([
    ['Preferences.get', 'workbench.colorTheme'],
    ['Preferences.getAll'],
    ['Preferences.get', 'workbnech.colorTheme'],
  ])
})

test.each([null, 42, { 'workbench.colorTheme': 42, 'workbnech.colorTheme': 42 }])(
  'getCurrentColorTheme ignores invalid all-preferences value: %p',
  async (preferences) => {
    using mockRpc = RendererWorker.registerMockRpc({
      'Preferences.get': () => undefined,
      'Preferences.getAll': () => preferences,
    })
    const result = await getCurrentColorTheme()
    expect(result).toBe('')
    expect(mockRpc.invocations).toEqual([
      ['Preferences.get', 'workbench.colorTheme'],
      ['Preferences.getAll'],
      ['Preferences.get', 'workbnech.colorTheme'],
    ])
  },
)
