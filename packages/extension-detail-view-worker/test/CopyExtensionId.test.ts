import { expect, test } from '@jest/globals'
import { ClipBoardWorker } from '@lvce-editor/rpc-registry'
import { copyExtensionId } from '../src/parts/CopyExtensionId/CopyExtensionId.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('copies the extension id', async () => {
  using mockRpc = ClipBoardWorker.registerMockRpc({
    'ClipBoard.writeText'() {},
  })
  const state = {
    ...createDefaultState(),
    extensionId: 'test.extension',
  }
  const result = await copyExtensionId(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'test.extension']])
})
