import { expect, jest, test } from '@jest/globals'
import * as HandleClickSize from '../src/parts/HandleClickSize/HandleClickSize.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

test('handle click size - opens folder', async () => {
  RpcRegistry.set(1, mockRpc)
  const state = {
    extension: {
      uri: 'test://sample-folder',
      id: 'test-id',
    },
  } as any
  await HandleClickSize.handleClickSize(state)

  expect(mockRpc.invoke).toHaveBeenCalledWith('OpenNativeFolder.openNativeFolder', 'test://sample-folder')
})
