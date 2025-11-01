import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleImageContextMenu from '../src/parts/HandleImageContextMenu/HandleImageContextMenu.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handleImageContextMenu calls showContextMenu and returns state unchanged', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }
  const eventX = 100
  const eventY = 200

  const result = await HandleImageContextMenu.handleImageContextMenu(state, eventX, eventY)

  expect(mockRpc.invocations).toEqual([['ContextMenu.show', eventX, eventY, 4091]])
  expect(result).toBe(state)
})
