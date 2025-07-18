import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { get, RpcId } from '@lvce-editor/rpc-registry'
import { initialize } from '../src/parts/Initialize/Initialize.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('should initialize both workers successfully', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {
      sendMessagePortToMarkdownWorker: () => {},
      sendMessagePortToFileSystemWorker: () => {},
    },
    invoke: (method: string) => {
      if (method === 'sendMessagePortToMarkdownWorker' || method === 'sendMessagePortToFileSystemWorker') {
        return undefined
      }
      throw new Error(`unexpected method: ${method}`)
    },
    invokeAndTransfer: () => {},
  })
  RendererWorker.set(mockRpc)
  await initialize()
  const fileSystemWorkerRpc = get(RpcId.FileSystemWorker)
  expect(fileSystemWorkerRpc).toBeDefined()
  await fileSystemWorkerRpc.dispose()
  const markdownWorker = get(RpcId.MarkdownWorker)
  expect(markdownWorker).toBeDefined()
  await markdownWorker.dispose()
})

test('should handle initialization errors', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {
      sendMessagePortToMarkdownWorker: () => {
        throw new Error('markdown worker failed')
      },
      sendMessagePortToFileSystemWorker: () => {},
    },
    invoke: (method: string) => {
      if (method === 'sendMessagePortToMarkdownWorker') {
        throw new Error('markdown worker failed')
      }
      if (method === 'sendMessagePortToFileSystemWorker') {
        return undefined
      }
      throw new Error(`unexpected method: ${method}`)
    },
    invokeAndTransfer: () => {
      throw new Error('markdown worker failed')
    },
  })
  RendererWorker.set(mockRpc)

  await expect(initialize()).rejects.toThrow('Failed to create markdown worker rpc')
})
