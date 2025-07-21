import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleImageContextMenu from '../src/parts/HandleImageContextMenu/HandleImageContextMenu.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handleImageContextMenu calls showContextMenu and returns state unchanged', async () => {
  let showContextMenuCalled = false
  let showContextMenuArgs: readonly any[] = []

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ContextMenu.show') {
        showContextMenuCalled = true
        showContextMenuArgs = args
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }
  const eventX = 100
  const eventY = 200

  const result = await HandleImageContextMenu.handleImageContextMenu(state, eventX, eventY)

  expect(showContextMenuCalled).toBe(true)
  expect(showContextMenuArgs).toEqual([eventX, eventY, 4091])
  expect(result).toBe(state)
})
