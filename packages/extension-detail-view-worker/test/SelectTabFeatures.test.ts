import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { register } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { selectTabFeatures } from '../src/parts/SelectTabFeatures/SelectTabFeatures.ts'

test('should select features tab and first feature when selectedFeature is null', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  // Register a mock feature
  const mockFeature = {
    id: 'MockFeature',
    getLabel: () => 'Mock Feature',
    isEnabled: () => true,
    getDetails: async () => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: () => [],
  }
  register(mockFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState({
      features: [
        { id: 'MockFeature', label: 'Mock Feature', selected: false },
        { id: 'Settings', label: 'Settings', selected: true },
      ],
      selectedFeature: '',
      selectedTab: '',
    }),
  }

  const result = await selectTabFeatures(initialState)

  expect(result.selectedTab).toBe(InputName.Features)
  expect(result.selectedFeature).toBe('MockFeature')
})

test('should use existing selectedFeature when provided', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  // Register a mock feature
  const mockFeature = {
    id: 'MockFeature',
    getLabel: () => 'Mock Feature',
    isEnabled: () => true,
    getDetails: async () => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: () => [],
  }
  register(mockFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState({
      features: [
        { id: 'MockFeature', label: 'Mock Feature', selected: false },
        { id: 'Settings', label: 'Settings', selected: true },
      ],
      selectedFeature: 'Settings',
      selectedTab: '',
    }),
  }

  const result = await selectTabFeatures(initialState)

  expect(result.selectedTab).toBe(InputName.Features)
  expect(result.selectedFeature).toBe('MockFeature')
})

test('should merge feature details handler results', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  // Register a mock feature that returns specific details
  const mockFeature = {
    id: 'MockFeature',
    getLabel: () => 'Mock Feature',
    isEnabled: () => true,
    getDetails: async () => ({
      detailsVirtualDom: [],
      commands: [
        [
          { type: 2, value: 'test.command' },
          { type: 1, value: 'Test Command' },
        ],
      ],
      description: 'Mock feature description',
    }),
    getVirtualDom: () => [],
  }
  register(mockFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState({
      features: [
        { id: 'MockFeature', label: 'Mock Feature', selected: false },
      ],
      selectedFeature: '',
      selectedTab: '',
      detailsVirtualDom: [],
      commands: [],
      description: '',
    }),
  }

  const result = await selectTabFeatures(initialState)

  expect(result.selectedTab).toBe(InputName.Features)
  expect(result.selectedFeature).toBe('MockFeature')
  expect(result.detailsVirtualDom).toEqual([{ type: 'div', children: [] }])
  expect(result.commands).toEqual([{ id: 'test.command', title: 'Test Command' }])
  expect(result.description).toBe('Mock feature description')
})

test('should handle empty features array', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'FileSystem.readDirWithFileTypes') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  // Register a mock feature
  const mockFeature = {
    id: 'MockFeature',
    getLabel: () => 'Mock Feature',
    isEnabled: () => true,
    getDetails: async () => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: () => [],
  }
  register(mockFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState({
      features: [],
      selectedFeature: '',
      selectedTab: '',
    }),
  }

  const result = await selectTabFeatures(initialState)

  expect(result.selectedTab).toBe(InputName.Features)
  expect(result.selectedFeature).toBe('')
})