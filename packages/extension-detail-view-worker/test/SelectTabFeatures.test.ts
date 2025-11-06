import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import type { FeatureDefinition } from '../src/parts/FeatureDefinition/FeatureDefinition.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { register } from '../src/parts/FeatureRegistry/FeatureRegistry.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
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
    id: 'MockFeature',
    getLabel: (): string => 'Mock Feature',
    isEnabled: (): boolean => true,
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: (): any[] => [],
  }
  const settingsFeature: FeatureDefinition = {
    id: 'Settings',
    getLabel: (): string => 'Settings',
    isEnabled: (): boolean => true,
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: (): any[] => [],
  }
  const themeFeature = {
    id: 'Theme',
    getLabel: (): string => 'Theme',
    isEnabled: (): boolean => true,
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: (): any[] => [],
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
    id: 'MockFeature',
    getLabel: (): string => 'Mock Feature',
    isEnabled: (): boolean => true,
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: (): any[] => [],
  }
  const settingsFeature = {
    id: 'Settings',
    getLabel: (): string => 'Settings',
    isEnabled: (): boolean => true,
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: (): any[] => [],
  }
  const themeFeature = {
    id: 'Theme',
    getLabel: (): string => 'Theme',
    isEnabled: (): boolean => true,
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: (): any[] => [],
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
    id: 'MockFeature',
    getLabel: (): string => 'Mock Feature',
    isEnabled: (): boolean => true,
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[]; description: string }> => ({
      detailsVirtualDom: [{ type: VirtualDomElements.Div, children: [] }],
      commands: [
        [
          { type: TableCellType.Code, value: 'test.command' },
          { type: TableCellType.Text, value: 'Test Command' },
        ],
      ],
      description: 'Mock feature description',
    }),
    getVirtualDom: (): any[] => [],
  }
  const themeFeature = {
    id: 'Theme',
    getLabel: (): string => 'Theme',
    isEnabled: (): boolean => true,
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: (): any[] => [],
  }
  register(mockFeature)
  register(themeFeature)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [{ id: 'MockFeature', label: 'Mock Feature', selected: false }],
    selectedFeature: '',
    selectedTab: '',
    detailsVirtualDom: [],
    commands: [],
    description: '',
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
    id: 'MockFeature',
    getLabel: (): string => 'Mock Feature',
    isEnabled: (): boolean => true,
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: (): any[] => [],
  }
  const themeFeature = {
    id: 'Theme',
    getLabel: (): string => 'Theme',
    isEnabled: (): boolean => true,
    getDetails: async (): Promise<{ detailsVirtualDom: any[]; commands: any[] }> => ({
      detailsVirtualDom: [],
      commands: [],
    }),
    getVirtualDom: (): any[] => [],
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
