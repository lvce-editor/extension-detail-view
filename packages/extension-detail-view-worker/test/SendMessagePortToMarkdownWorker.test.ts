import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as SendMessagePortToMarkdownWorker from '../src/parts/SendMessagePortToMarkdownWorker/SendMessagePortToMarkdownWorker.ts'

test('sends message port to markdown worker', async () => {
  const mockPort = { id: 'test-port' }

  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker': () => {},
  })

  await SendMessagePortToMarkdownWorker.sendMessagePortToMarkdownWorker(mockPort)

  expect(mockRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToMarkdownWorker', mockPort, 'Markdown.handleMessagePort', 0],
  ])
})
