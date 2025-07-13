import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { selectFeature } from '../src/parts/SelectFeature/SelectFeature.ts'

test.skip('should return same state when name is empty', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'Commands', label: 'Commands', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
    ],
  }

  const result = await selectFeature(initialState, '')

  expect(result).toBe(initialState)
})

test.skip('should return same state when name is null', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'Commands', label: 'Commands', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
    ],
  }

  const result = await selectFeature(initialState, null as any)

  expect(result).toBe(initialState)
})

test.skip('should select feature and update state', async () => {
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
})

test.skip('should call feature details handler and merge results', async () => {
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
})

test.skip('should handle unknown feature gracefully', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const initialState: ExtensionDetailState = {
    ...createDefaultState(),
    features: [
      { id: 'Commands', label: 'Commands', selected: false },
      { id: 'Settings', label: 'Settings', selected: true },
    ],
  }

  await expect(selectFeature(initialState, 'UnknownFeature')).rejects.toThrow('unknown feature details handler: UnknownFeature')
})
