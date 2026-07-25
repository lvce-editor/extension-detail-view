import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getApplicationName } from '../src/parts/GetApplicationName/GetApplicationName.ts'

test('gets the application name from renderer worker layout', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getApplicationName': () => {
      return 'test-app'
    },
  })

  await expect(getApplicationName()).resolves.toBe('test-app')
  expect(mockRpc.invocations).toEqual([['Layout.getApplicationName']])
})
