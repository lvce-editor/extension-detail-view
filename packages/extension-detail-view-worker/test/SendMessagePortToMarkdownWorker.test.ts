import { expect, test } from '@jest/globals'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as SendMessagePortToMarkdownWorker from '../src/parts/SendMessagePortToMarkdownWorker/SendMessagePortToMarkdownWorker.ts'

test('sends message port to markdown worker', async () => {
  const mockPort = { id: 'test-port' }

  const mockRpc = RendererWorker.registerMockRpc({
    sendMessagePortToMarkdownWorker: () => {
      /**/
    },
  })

  await SendMessagePortToMarkdownWorker.sendMessagePortToMarkdownWorker(mockPort)

  expect(mockRpc.invocations).toEqual([['sendMessagePortToMarkdownWorker', mockPort, 0]])
})
