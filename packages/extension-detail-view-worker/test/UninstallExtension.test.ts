import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as UninstallExtension from '../src/parts/UninstallExtension/UninstallExtension.ts'

test('uninstall extension', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)
  await UninstallExtension.uninstallExtension('test-id')
  expect(invoke).toHaveBeenCalledWith('ExtensionManagement.uninstall', 'test-id')
})

test('handles error during uninstall', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)
  const error = new Error('Failed to uninstall extension')
  invoke.mockRejectedValue(error)
  await expect(UninstallExtension.uninstallExtension('test-id')).rejects.toThrow('Failed to uninstall extension')
})
