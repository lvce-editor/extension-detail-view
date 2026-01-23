import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleImageContextMenu from '../src/parts/HandleImageContextMenu/HandleImageContextMenu.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

test('handleImageContextMenu calls ContextMenu.show2 with correct parameters and returns state unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uid: 123,
  }
  const eventX = 100
  const eventY = 200

  const result = await HandleImageContextMenu.handleImageContextMenu(state, eventX, eventY)

  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.ExtensionDetailIconContextMenu,
      eventX,
      eventY,
      {
        menuId: MenuEntryId.ExtensionDetailIconContextMenu,
      },
    ],
  ])
  expect(result).toBe(state)
})

test('handleImageContextMenu passes correct coordinates to ContextMenu.show2', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uid: 456,
  }
  const eventX = 300
  const eventY = 400

  await HandleImageContextMenu.handleImageContextMenu(state, eventX, eventY)

  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.ExtensionDetailIconContextMenu,
      eventX,
      eventY,
      {
        menuId: MenuEntryId.ExtensionDetailIconContextMenu,
      },
    ],
  ])
})

test('handleImageContextMenu returns state regardless of coordinates', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    name: 'Test Extension',
    uid: 789,
  }

  const result1 = await HandleImageContextMenu.handleImageContextMenu(state, 50, 75)
  const result2 = await HandleImageContextMenu.handleImageContextMenu(state, 500, 600)

  expect(result1).toBe(state)
  expect(result2).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.ExtensionDetailIconContextMenu,
      50,
      75,
      {
        menuId: MenuEntryId.ExtensionDetailIconContextMenu,
      },
    ],
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.ExtensionDetailIconContextMenu,
      500,
      600,
      {
        menuId: MenuEntryId.ExtensionDetailIconContextMenu,
      },
    ],
  ])
})
