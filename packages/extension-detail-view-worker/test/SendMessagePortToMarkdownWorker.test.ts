import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as SendMessagePortToMarkdownWorker from '../src/parts/SendMessagePortToMarkdownWorker/SendMessagePortToMarkdownWorker.ts'

test('sends message port to markdown worker', async () => {
  const mockPort = { id: 'test-port' }
  const invokeAndTransfer = jest.fn(async () => {})

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async () => {},
    invokeAndTransfer,
  })
  RendererWorker.set(mockRpc)

  await SendMessagePortToMarkdownWorker.sendMessagePortToMarkdownWorker(mockPort)

  expect(invokeAndTransfer).toHaveBeenCalled()
  const call = (invokeAndTransfer.mock.calls[0] as unknown) as [string, any, any]
  expect(call[1]).toBe(mockPort)
})