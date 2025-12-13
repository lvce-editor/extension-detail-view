import { test, expect } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import type { FeatureDefinition } from '../src/parts/FeatureDefinition/FeatureDefinition.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { register } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { selectTabFeatures } from '../src/parts/SelectTabFeatures/SelectTabFeatures.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('should select features tab and first feature when selectedFeature is null', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  // Register mock features
  const mockFeature: FeatureDefinition = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Mock Feature',
    getVirtualDom: (): any[] => [],
    id: 'MockFeature',
    isEnabled: (): boolean => true,
  }
  const settingsFeature: FeatureDefinition = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Settings',
    getVirtualDom: (): any[] => [],
    id: 'Settings',
    isEnabled: (): boolean => true,
  }
  const themeFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Theme',
    getVirtualDom: (): any[] => [],
    id: 'Theme',
    isEnabled: (): boolean => true,
  }
  register(mockFeature)
  register(settingsFeature)
  register(themeFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'MockFeature', label: 'Mock Feature', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
    ],
    selectedFeature: '',
    selectedTab: '',
  }

  const result = await selectTabFeatures(initialState)

  expect(result.selectedTab).toBe(InputName.Features)
  expect(result.selectedFeature).toBe('MockFeature')
  expect(mockRpc.invocations).toEqual([])
})

test('should use existing selectedFeature when provided', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  // Register mock features
  const mockFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Mock Feature',
    getVirtualDom: (): any[] => [],
    id: 'MockFeature',
    isEnabled: (): boolean => true,
  }
  const settingsFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Settings',
    getVirtualDom: (): any[] => [],
    id: 'Settings',
    isEnabled: (): boolean => true,
  }
  const themeFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Theme',
    getVirtualDom: (): any[] => [],
    id: 'Theme',
    isEnabled: (): boolean => true,
  }
  register(mockFeature)
  register(settingsFeature)
  register(themeFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'MockFeature', label: 'Mock Feature', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
    ],
    selectedFeature: 'Settings',
    selectedTab: '',
  }

  const result = await selectTabFeatures(initialState)

  expect(result.selectedTab).toBe(InputName.Features)
  expect(result.selectedFeature).toBe('MockFeature')
  expect(mockRpc.invocations).toEqual([])
})

test('should merge feature details handler results', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  // Register a mock feature that returns specific details
  const mockFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[]; description: string }> => ({
      commands: [
        [
          { type: TableCellType.Code, value: 'test.command' },
          { type: TableCellType.Text, value: 'Test Command' },
        ],
      ],
      description: 'Mock feature description',
      detailsVirtualDom: [{ children: [], type: VirtualDomElements.Div }],
    }),
    getLabel: (): string => 'Mock Feature',
    getVirtualDom: (): any[] => [],
    id: 'MockFeature',
    isEnabled: (): boolean => true,
  }
  const themeFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Theme',
    getVirtualDom: (): any[] => [],
    id: 'Theme',
    isEnabled: (): boolean => true,
  }
  register(mockFeature)
  register(themeFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    commands: [],
    description: '',
    detailsVirtualDom: [],
    features: [{ id: 'MockFeature', label: 'Mock Feature', selected: false }],
    selectedFeature: '',
    selectedTab: '',
  }

  const result = await selectTabFeatures(initialState)

  expect(result.selectedTab).toBe(InputName.Features)
  expect(result.selectedFeature).toBe('MockFeature')
  expect(result.detailsVirtualDom).toEqual([])
  expect(result.commands).toEqual([])
  expect(result.description).toBe('')
  expect(mockRpc.invocations).toEqual([])
})

test('should handle empty features array', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  // Register a mock feature
  const mockFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Mock Feature',
    getVirtualDom: (): any[] => [],
    id: 'MockFeature',
    isEnabled: (): boolean => true,
  }
  const themeFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Theme',
    getVirtualDom: (): any[] => [],
    id: 'Theme',
    isEnabled: (): boolean => true,
  }
  register(mockFeature)
  register(themeFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [{ id: 'MockFeature', label: 'Mock Feature', selected: false }],
    selectedFeature: '',
    selectedTab: '',
  }

  const result = await selectTabFeatures(initialState)

  expect(result.selectedTab).toBe(InputName.Features)
  expect(result.selectedFeature).toBe('MockFeature')
  expect(mockRpc.invocations).toEqual([])
})

test('should return state unchanged when features array is empty', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [],
    selectedFeature: 'SomeFeature',
    selectedTab: InputName.Details,
    tabs: [
      { enabled: true, label: 'Details', name: InputName.Details, selected: true },
      { enabled: true, label: 'Features', name: InputName.Features, selected: false },
      { enabled: true, label: 'Changelog', name: InputName.Changelog, selected: false },
    ],
  }

  const result = await selectTabFeatures(initialState)

  expect(result).toBe(initialState)
  expect(result.features).toEqual([])
  expect(result.selectedFeature).toBe('SomeFeature')
  expect(result.selectedTab).toBe(InputName.Details)
  expect(mockRpc.invocations).toEqual([])
})

test('should correctly update tabs selection to Features tab', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'FileSystem.readDirWithFileTypes': () => {
      return []
    },
  })

  // Register mock features
  const mockFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Mock Feature',
    getVirtualDom: (): any[] => [],
    id: 'MockFeature',
    isEnabled: (): boolean => true,
  }
  const themeFeature = {
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      commands: [],
      detailsVirtualDom: [],
    }),
    getLabel: (): string => 'Theme',
    getVirtualDom: (): any[] => [],
    id: 'Theme',
    isEnabled: (): boolean => true,
  }
  register(mockFeature)
  register(themeFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [{ id: 'MockFeature', label: 'Mock Feature', selected: false }],
    selectedFeature: '',
    selectedTab: InputName.Details,
    tabs: [
      { enabled: true, label: 'Details', name: InputName.Details, selected: true },
      { enabled: true, label: 'Features', name: InputName.Features, selected: false },
      { enabled: true, label: 'Changelog', name: InputName.Changelog, selected: false },
    ],
  }

  const result = await selectTabFeatures(initialState)

  expect(result.tabs).toHaveLength(3)
  expect(result.tabs[0]).toEqual({
    enabled: true,
    label: 'Details',
    name: InputName.Details,
    selected: false,
  })
  expect(result.tabs[1]).toEqual({
    enabled: true,
    label: 'Features',
    name: InputName.Features,
    selected: true,
  })
  expect(result.tabs[2]).toEqual({
    enabled: true,
    label: 'Changelog',
    name: InputName.Changelog,
    selected: false,
  })
  expect(mockRpc.invocations).toEqual([])
})
