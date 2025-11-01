import { test, expect } from '@jest/globals'
import { VError } from '@lvce-editor/verror'
import { createMarkdownWorkerRpc } from '../src/parts/CreateMarkdownWorkerRpc/CreateMarkdownWorkerRpc.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('createMarkdownWorkerRpc creates RPC successfully', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    sendMessagePortToMarkdownWorker: () => {
      /**/
    },
  })
  const rpc = await createMarkdownWorkerRpc()
  expect(rpc).toBeDefined()
  await rpc.dispose()
})

test('createMarkdownWorkerRpc throws VError when sendMessagePortToMarkdownWorker fails', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    sendMessagePortToMarkdownWorker: () => {
      throw new Error('fail')
    },
  })
  await expect(createMarkdownWorkerRpc()).rejects.toThrow(VError)
  await expect(createMarkdownWorkerRpc()).rejects.toThrow('Failed to create markdown worker rpc')
})
