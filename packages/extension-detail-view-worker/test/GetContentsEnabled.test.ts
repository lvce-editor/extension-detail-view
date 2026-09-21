import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getContentsEnabled } from '../src/parts/GetContentsEnabled/GetContentsEnabled.ts'

test.each([true, 'true'])('returns true for enabled preference %s', async (value) => {
  using mockRpc = RendererWorker.registerMockRpc({ 'Preferences.get': () => value })
  await expect(getContentsEnabled()).resolves.toBe(true)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'extensionsShowContents']])
})

test.each([false, 'false', null, undefined, 'other'])('returns false for disabled preference %s', async (value) => {
  using mockRpc = RendererWorker.registerMockRpc({ 'Preferences.get': () => value })
  await expect(getContentsEnabled()).resolves.toBe(false)
  expect(mockRpc.invocations).toHaveLength(1)
})

test('returns false when preference lookup fails', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => {
      throw new Error('failed')
    },
  })
  await expect(getContentsEnabled()).resolves.toBe(false)
  expect(mockRpc.invocations).toHaveLength(1)
})
