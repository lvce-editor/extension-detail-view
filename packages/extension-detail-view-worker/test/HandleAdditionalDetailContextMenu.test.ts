import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleAdditionalDetailContextMenu from '../src/parts/HandleAdditionalDetailContextMenu/HandleAdditionalDetailContextMenu.ts'

test('handleAdditionalDetailContextMenu calls ContextMenu.show2 and returns state unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uid: 123,
  }
  const x = 150
  const y = 250
  const nodeName = 'A'
  const href = 'https://example.com'

  const result = await HandleAdditionalDetailContextMenu.handleAdditionalDetailContextMenu(state, x, y, nodeName, href)

  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.ExtensionDetailReadme,
      x,
      y,
      {
        href,
        menuId: MenuEntryId.ExtensionDetailReadme,
        nodeName,
      },
    ],
  ])
  expect(result).toBe(state)
})

test('handleAdditionalDetailContextMenu passes correct coordinates to ContextMenu.show2', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    uid: 456,
  }
  const x = 300
  const y = 400
  const nodeName = 'IMG'
  const href = '/image.png'

  await HandleAdditionalDetailContextMenu.handleAdditionalDetailContextMenu(state, x, y, nodeName, href)

  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.ExtensionDetailReadme,
      x,
      y,
      {
        href,
        menuId: MenuEntryId.ExtensionDetailReadme,
        nodeName,
      },
    ],
  ])
})

test('handleAdditionalDetailContextMenu returns state regardless of nodeName and href', async () => {
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

  const result1 = await HandleAdditionalDetailContextMenu.handleAdditionalDetailContextMenu(state, 100, 200, 'A', 'https://example.com')
  const result2 = await HandleAdditionalDetailContextMenu.handleAdditionalDetailContextMenu(state, 100, 200, 'IMG', '/image.png')

  expect(result1).toBe(state)
  expect(result2).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.ExtensionDetailReadme,
      100,
      200,
      {
        href: 'https://example.com',
        menuId: MenuEntryId.ExtensionDetailReadme,
        nodeName: 'A',
      },
    ],
    [
      'ContextMenu.show2',
      state.uid,
      MenuEntryId.ExtensionDetailReadme,
      100,
      200,
      {
        href: '/image.png',
        menuId: MenuEntryId.ExtensionDetailReadme,
        nodeName: 'IMG',
      },
    ],
  ])
})
