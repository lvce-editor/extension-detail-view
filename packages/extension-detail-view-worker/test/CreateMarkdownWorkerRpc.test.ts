import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createMarkdownWorkerRpc } from '../src/parts/CreateMarkdownWorkerRpc/CreateMarkdownWorkerRpc.ts'

test('createMarkdownWorkerRpc creates RPC successfully', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker': () => {},
  })
  const rpc = await createMarkdownWorkerRpc()
  expect(rpc).toBeDefined()
  await rpc.dispose()
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker', expect.anything(), 'Markdown.handleMessagePort', 0],
  ])
})

test.skip('createMarkdownWorkerRpc throws VError when sendMessagePortToMarkdownWorker fails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker': () => {
      throw new Error('fail')
    },
  })
  await expect(createMarkdownWorkerRpc()).rejects.toThrow('Failed to create markdown worker rpc')
  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker', expect.anything(), 'Markdown.handleMessagePort', 0],
  ])
})
