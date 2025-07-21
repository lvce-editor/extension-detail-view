import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as OpenExternal from '../src/parts/OpenExternal/OpenExternal.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('openUrl calls RendererWorker.openUrl with the correct uri', async () => {
  let openUrlCalled = false
  let openUrlArg: string | undefined

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'Open.openUrl') {
        openUrlCalled = true
        openUrlArg = args[0]
        return undefined
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const testUri = 'https://example.com'
  await OpenExternal.openUrl(testUri)

  expect(openUrlCalled).toBe(true)
  expect(openUrlArg).toBe(testUri)
})