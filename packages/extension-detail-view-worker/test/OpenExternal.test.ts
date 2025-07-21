import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as OpenExternal from '../src/parts/OpenExternal/OpenExternal.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('openUrl calls RendererWorker.openUrl with the correct uri', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'Open.openUrl') {
      return undefined
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const testUri = 'https://example.com'
  await OpenExternal.openUrl(testUri)

  expect(mockInvoke).toHaveBeenCalledWith('Open.openUrl', testUri)
})