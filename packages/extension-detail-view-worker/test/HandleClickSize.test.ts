import { expect, jest, test } from '@jest/globals'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'
import * as HandleClickSize from '../src/parts/HandleClickSize/HandleClickSize.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

test('handle click size', async () => {
  RpcRegistry.set(1, mockRpc)
  mockRpc.invoke.mockResolvedValue(1024)
  const state = {
    extensionDetail: {
      id: 'test-id',
    },
  } as any
  expect(await HandleClickSize.handleClickSize(state)).toEqual({
    ...state,
    folderSize: 1024,
  })
  expect(mockRpc.invoke).toHaveBeenCalledWith('ExtensionManagement.getFolderSize', 'test-id')
})

test('handles error during size calculation', async () => {
  RpcRegistry.set(1, mockRpc)
  const error = new Error('Failed to get folder size')
  mockRpc.invoke.mockRejectedValue(error)
  const state = {
    extensionDetail: {
      id: 'test-id',
    },
  } as any
  await expect(HandleClickSize.handleClickSize(state)).rejects.toThrow('Failed to get folder size')
})

test('handles missing extension id', async () => {
  RpcRegistry.set(1, mockRpc)
  const state = {
    extensionDetail: {},
  } as any
  expect(await HandleClickSize.handleClickSize(state)).toEqual(state)
  expect(mockRpc.invoke).not.toHaveBeenCalled()
})
