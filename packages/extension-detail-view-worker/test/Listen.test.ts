import { expect, test, jest } from '@jest/globals'

jest.unstable_mockModule('@lvce-editor/rpc', () => ({
  WebWorkerRpcClient: {
    create: jest.fn(),
  },
}))

const { WebWorkerRpcClient } = await import('@lvce-editor/rpc')
const Listen = await import('../src/parts/Listen/Listen.ts')

test('listen registers event handlers', async () => {
  await Listen.listen()
  expect(WebWorkerRpcClient.create).toHaveBeenCalledTimes(1)
})

test('listen handles errors', async () => {
  // @ts-expect-error
  WebWorkerRpcClient.create.mockRejectedValue(new Error('test error'))
  await expect(Listen.listen()).rejects.toThrow('test error')
})
