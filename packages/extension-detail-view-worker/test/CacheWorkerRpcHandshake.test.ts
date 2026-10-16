import { expect, jest, test } from '@jest/globals'
import { MessagePortRpcClient } from '@lvce-editor/rpc'

/* eslint-disable jest/no-restricted-jest-methods -- This test keeps the RPC implementation real while simulating the renderer port transfer. */
let cacheWorkerRpc: Awaited<ReturnType<typeof MessagePortRpcClient.create>> | undefined

jest.unstable_mockModule('@lvce-editor/rpc-registry', () => ({
  RendererWorker: {
    invokeAndTransfer: async (_command: string, port: MessagePort): Promise<void> => {
      cacheWorkerRpc = await MessagePortRpcClient.create({
        commandMap: {
          'Cache.getCacheStorageItem': (): string => 'cached value',
        },
        messagePort: port,
      })
    },
  },
}))

const { createCacheWorkerRpc } = await import('../src/parts/CreateCacheWorkerRpc/CreateCacheWorkerRpc.ts')

test('waits for the cache worker ready message before handling rpc requests', async () => {
  const rpc = await createCacheWorkerRpc()

  try {
    await expect(rpc.invoke('Cache.getCacheStorageItem')).resolves.toBe('cached value')
    expect(cacheWorkerRpc).toBeDefined()
  } finally {
    await rpc.dispose?.()
    await cacheWorkerRpc?.dispose?.()
  }
})
