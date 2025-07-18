import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import { createFileSystemWorkerRpc } from '../src/parts/CreateFileSystemWorkerRpc/CreateFileSystemWorkerRpc.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('createFileSystemWorkerRpc creates RPC successfully', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {
      sendMessagePortToFileSystemWorker: () => {},
    },
    invoke: (method: string) => {
      if (method === 'sendMessagePortToFileSystemWorker') {
        return undefined
      }
      throw new Error(`unexpected method: ${method}`)
    },
    // Add invokeAndTransfer to satisfy the interface
    invokeAndTransfer: () => {},
  })
  RendererWorker.set(mockRpc)
  const rpc = await createFileSystemWorkerRpc()
  expect(rpc).toBeDefined()
  await rpc.dispose()
})

test('createFileSystemWorkerRpc throws VError when sendMessagePortToFileSystemWorker fails', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {
      sendMessagePortToFileSystemWorker: () => {
        throw new Error('fail')
      },
    },
    invoke: (method: string) => {
      if (method === 'sendMessagePortToFileSystemWorker') {
        throw new Error('fail')
      }
      throw new Error(`unexpected method: ${method}`)
    },
    invokeAndTransfer: () => {
      throw new Error('fail')
    },
  })
  RendererWorker.set(mockRpc)
  await expect(createFileSystemWorkerRpc()).rejects.toThrow(VError)
  await expect(createFileSystemWorkerRpc()).rejects.toThrow('Failed to create file system worker rpc')
})
