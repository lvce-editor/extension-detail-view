import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { selectFeature } from '../src/parts/SelectFeature/SelectFeature.ts'

test('should return same state when name is empty', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'Commands', label: 'Commands', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
    ],
  }

  const result = await selectFeature(initialState, '')

  expect(result).toBe(initialState)
  expect(mockRpc.invocations).toEqual([])
})

test('should return same state when name is null', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'Commands', label: 'Commands', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
    ],
  }

  const result = await selectFeature(initialState, null as any)

  expect(result).toBe(initialState)
  expect(mockRpc.invocations).toEqual([])
})

test.skip('should select feature and update state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'Commands', label: 'Commands', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
      { id: 'Theme', label: 'Theme', selected: false },
    ],
    selectedFeature: 'Settings',
  }

  const result = await selectFeature(initialState, 'Commands')

  expect(result.selectedFeature).toBe('Commands')
  expect(result.features).toEqual([
    { id: 'Commands', label: 'Commands', selected: true },
    { id: 'Settings', label: 'Settings', selected: false },
    { id: 'Theme', label: 'Theme', selected: false },
  ])
  expect(mockRpc.invocations).toEqual([['FileSystem.readDirWithFileTypes', expect.any(String)]])
})

test.skip('should call feature details handler and merge results', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'Commands', label: 'Commands', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
    ],
    selectedFeature: 'Settings',
    commands: [],
  }

  const result = await selectFeature(initialState, 'Commands')

  expect(result.selectedFeature).toBe('Commands')
  expect(result.features).toEqual([
    { id: 'Commands', label: 'Commands', selected: true },
    { id: 'Settings', label: 'Settings', selected: false },
  ])
  expect(result.commands).toBeDefined()
  expect(mockRpc.invocations).toEqual([['FileSystem.readDirWithFileTypes', expect.any(String)]])
})

test('should handle unknown feature gracefully', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'Commands', label: 'Commands', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
    ],
  }

  await expect(selectFeature(initialState, 'UnknownFeature')).rejects.toThrow('unknown feature: UnknownFeature')
  expect(mockRpc.invocations).toEqual([])
})
