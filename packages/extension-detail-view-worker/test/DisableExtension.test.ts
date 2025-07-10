import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as DisableExtension from '../src/parts/DisableExtension/DisableExtension.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('disable extension', async () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)
  await DisableExtension.disableExtension('test-id')
  expect(invoke).toHaveBeenCalledWith('ExtensionManagement.disable', 'test-id')
})

test('handles error during disable', async () => {
  const error = new Error('Failed to disable extension')
  const invoke = jest.fn<(...args: any[]) => Promise<any>>().mockRejectedValue(error)
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)
  await expect(DisableExtension.disableExtension('test-id')).rejects.toThrow('Failed to disable extension')
})
