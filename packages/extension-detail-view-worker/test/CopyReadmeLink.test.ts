import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as CopyReadmeLink from '../src/parts/CopyReadmeLink/CopyReadmeLink.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('copyReadmeLink calls writeText with href and returns state unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => {
      /**/
    },
  })

  const href = 'https://example.com/readme'
  const state: ExtensionDetailState = createDefaultState()

  const result = await CopyReadmeLink.copyReadmeLink(state, href)

  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', href]])
  expect(result).toBe(state)
})
