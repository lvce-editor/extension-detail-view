import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickSize from '../src/parts/HandleClickSize/HandleClickSize.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handle click size - opens folder', async () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      uri: 'test://sample-folder',
      id: 'test-id',
    },
  }
  await HandleClickSize.handleClickSize(state)

  expect(invoke).toHaveBeenCalledWith('OpenNativeFolder.openNativeFolder', 'test://sample-folder')
})
