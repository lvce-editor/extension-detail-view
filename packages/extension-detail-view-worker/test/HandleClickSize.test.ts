import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickSize from '../src/parts/HandleClickSize/HandleClickSize.ts'

test('handle click size - opens folder', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'OpenNativeFolder.openNativeFolder': () => {
      /**/
    },
  })
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      id: 'test-id',
      uri: 'test://sample-folder',
    },
  }
  await HandleClickSize.handleClickSize(state)

  expect(mockRpc.invocations).toEqual([['OpenNativeFolder.openNativeFolder', 'test://sample-folder']])
})
