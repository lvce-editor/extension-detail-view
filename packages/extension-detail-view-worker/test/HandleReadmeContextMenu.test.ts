import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleReadmeContextMenu from '../src/parts/HandleReadmeContextMenu/HandleReadmeContextMenu.ts'

test('handleReadmeContextMenu calls ContextMenu.show2 and returns state unchanged', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
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

  const result = await HandleReadmeContextMenu.handleReadmeContextMenu(state, x, y, nodeName, href)

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

test('handleReadmeContextMenu passes correct coordinates to ContextMenu.show2', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
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

  await HandleReadmeContextMenu.handleReadmeContextMenu(state, x, y, nodeName, href)

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

test('handleReadmeContextMenu returns state regardless of nodeName and href', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    name: 'Test Extension',
    uid: 789,
  }

  const result1 = await HandleReadmeContextMenu.handleReadmeContextMenu(state, 100, 200, 'A', 'https://example.com')
  const result2 = await HandleReadmeContextMenu.handleReadmeContextMenu(state, 100, 200, 'IMG', '/image.png')

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
