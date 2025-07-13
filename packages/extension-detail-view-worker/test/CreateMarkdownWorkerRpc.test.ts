import { jest, test, expect } from '@jest/globals'
import { VError } from '@lvce-editor/verror'
import { createMarkdownWorkerRpc } from '../src/parts/CreateMarkdownWorkerRpc/CreateMarkdownWorkerRpc.ts'
import * as SendMessagePortToMarkdownWorker from '../src/parts/SendMessagePortToMarkdownWorker/SendMessagePortToMarkdownWorker.ts'

test('createMarkdownWorkerRpc creates RPC successfully', async () => {
  const mockSendMessagePortToMarkdownWorker = jest.fn().mockResolvedValue(undefined)
  jest.spyOn(SendMessagePortToMarkdownWorker, 'sendMessagePortToMarkdownWorker').mockImplementation(mockSendMessagePortToMarkdownWorker as any)

  const rpc = await createMarkdownWorkerRpc()

  expect(rpc).toBeDefined()
  expect(typeof rpc.invoke).toBe('function')
})

test('createMarkdownWorkerRpc throws VError when creation fails', async () => {
  const mockSendMessagePortToMarkdownWorker = jest.fn().mockRejectedValue(new Error('Test error'))
  jest.spyOn(SendMessagePortToMarkdownWorker, 'sendMessagePortToMarkdownWorker').mockImplementation(mockSendMessagePortToMarkdownWorker as any)

  await expect(createMarkdownWorkerRpc()).rejects.toThrow(VError)
  await expect(createMarkdownWorkerRpc()).rejects.toThrow('Failed to create markdown worker rpc')
})