import { test, expect, beforeEach } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import type { FeatureDefinition } from '../src/parts/FeatureDefinition/FeatureDefinition.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { clearRegistry, register } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import { selectFeature } from '../src/parts/SelectFeature/SelectFeature.ts'

beforeEach(clearRegistry)

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

test.skip('should call feature details handler and merge results - skipped', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    commands: [],
    features: [
      { id: 'Commands', label: 'Commands', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
    ],
    selectedFeature: 'Settings',
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

test('should set selected to true for matching feature', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const mockFeature: FeatureDefinition = {
    getDetails: async (): Promise<Partial<ExtensionDetailState>> => ({
      commands: [],
    }),
    getLabel: (): string => 'TestFeature',
    getVirtualDom: (): any[] => [],
    id: 'TestFeature',
    isEnabled: (): boolean => true,
  }
  register(mockFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'TestFeature', label: 'TestFeature', selected: false },
      { id: 'OtherFeature', label: 'OtherFeature', selected: true },
    ],
  }

  const result = await selectFeature(initialState, 'TestFeature')

  expect(result.features[0].selected).toBe(true)
  expect(result.features[1].selected).toBe(false)
  expect(mockRpc.invocations).toEqual([])
})

test('should call feature details handler and merge results', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  let handlerCalled = false
  const mockFeature: FeatureDefinition = {
    getDetails: async (extension: any, baseUrl: string, locationProtocol: string): Promise<Partial<ExtensionDetailState>> => {
      handlerCalled = true
      expect(extension).toBeDefined()
      expect(baseUrl).toBeDefined()
      expect(locationProtocol).toBeDefined()
      return {
        // @ts-ignore
        commands: [{ id: 'test.command', title: 'Test Command' }],
        description: 'Test description',
      }
    },
    getLabel: (): string => 'TestFeature',
    getVirtualDom: (): any[] => [],
    id: 'TestFeature',
    isEnabled: (): boolean => true,
  }
  register(mockFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    commands: [],
    description: '',
    features: [{ id: 'TestFeature', label: 'TestFeature', selected: false }],
  }

  const result = await selectFeature(initialState, 'TestFeature')

  expect(handlerCalled).toBe(true)
  expect(result.commands).toEqual([{ id: 'test.command', title: 'Test Command' }])
  expect(result.description).toBe('Test description')
  expect(mockRpc.invocations).toEqual([])
})
