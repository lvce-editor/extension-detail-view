import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as HandleClickSize from '../src/parts/HandleClickSize/HandleClickSize.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handle click size - opens folder', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)
  const state = {
    extension: {
      uri: 'test://sample-folder',
      id: 'test-id',
    },
  } as any
  await HandleClickSize.handleClickSize(state)

  expect(invoke).toHaveBeenCalledWith('OpenNativeFolder.openNativeFolder', 'test://sample-folder')
})
