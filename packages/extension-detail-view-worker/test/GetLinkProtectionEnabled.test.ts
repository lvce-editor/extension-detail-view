import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getLinkProtectionEnabled } from '../src/parts/GetLinkProtectionEnabled/GetLinkProtectionEnabled.ts'

test('getLinkProtectionEnabled returns true when preference is true', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => true,
  })
  const result = await getLinkProtectionEnabled()
  expect(result).toBe(true)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'application.linkProtectionEnabled']])
})

test('getLinkProtectionEnabled returns true when preference is string "true"', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => 'true',
  })
  const result = await getLinkProtectionEnabled()
  expect(result).toBe(true)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'application.linkProtectionEnabled']])
})

test('getLinkProtectionEnabled returns false when preference is false', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => false,
  })
  const result = await getLinkProtectionEnabled()
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'application.linkProtectionEnabled']])
})

test('getLinkProtectionEnabled returns false when preference is string "false"', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => 'false',
  })
  const result = await getLinkProtectionEnabled()
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'application.linkProtectionEnabled']])
})

test('getLinkProtectionEnabled returns false when preference is null', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => null,
  })
  const result = await getLinkProtectionEnabled()
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'application.linkProtectionEnabled']])
})

test('getLinkProtectionEnabled returns false when preference is undefined', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => undefined,
  })
  const result = await getLinkProtectionEnabled()
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'application.linkProtectionEnabled']])
})

test('getLinkProtectionEnabled returns false when preference is other value', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Preferences.get': () => 'other',
  })
  const result = await getLinkProtectionEnabled()
  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([['Preferences.get', 'application.linkProtectionEnabled']])
})
