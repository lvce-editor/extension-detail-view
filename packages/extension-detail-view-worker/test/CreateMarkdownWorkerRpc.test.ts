import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import { VError } from '@lvce-editor/verror'
import { createMarkdownWorkerRpc } from '../src/parts/CreateMarkdownWorkerRpc/CreateMarkdownWorkerRpc.ts'

test('createMarkdownWorkerRpc creates RPC successfully', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {
      sendMessagePortToMarkdownWorker: () => {},
    },
    invoke: (method: string) => {
      if (method === 'sendMessagePortToMarkdownWorker') {
        return undefined
      }
      throw new Error(`unexpected method: ${method}`)
    },
    // Add invokeAndTransfer to satisfy the interface
    invokeAndTransfer: () => {},
  })
  RendererWorker.set(mockRpc)
  const rpc = await createMarkdownWorkerRpc()
  expect(rpc).toBeDefined()
  await rpc.dispose()
})

test('createMarkdownWorkerRpc throws VError when sendMessagePortToMarkdownWorker fails', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {
      sendMessagePortToMarkdownWorker: () => {
        throw new Error('fail')
      },
    },
    invoke: (method: string) => {
      if (method === 'sendMessagePortToMarkdownWorker') {
        throw new Error('fail')
      }
      throw new Error(`unexpected method: ${method}`)
    },
    invokeAndTransfer: () => {
      throw new Error('fail')
    },
  })
  RendererWorker.set(mockRpc)
  await expect(createMarkdownWorkerRpc()).rejects.toThrow(VError)
  await expect(createMarkdownWorkerRpc()).rejects.toThrow('Failed to create markdown worker rpc')
})
