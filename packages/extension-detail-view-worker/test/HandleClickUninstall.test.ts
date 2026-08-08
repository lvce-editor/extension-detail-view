import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickUninstall from '../src/parts/HandleClickUninstall/HandleClickUninstall.ts'

test('handle click uninstall - calls uninstall extension and removes extension actions', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.uninstall': () => {
      /**/
    },
  })
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    buttons: [{ enabled: true, label: 'Uninstall', name: 'Uninstall', onClick: 'handleClickUninstall' }],
    extension: {
      id: 'test-id',
      uri: 'test://sample-folder',
    },
  }
  const result = await HandleClickUninstall.handleClickUninstall(state)

  expect(mockRpc.invocations).toEqual([['Extensions.uninstall', 'test-id']])
  expect(result.buttons).toEqual([])
})

test('handle click uninstall - shows an error dialog and returns state unchanged when uninstall fails', async () => {
  const error = new Error('Failed to uninstall extension')
  using rendererWorker = RendererWorker.registerMockRpc({
    'ErrorHandling.showErrorDialog'() {},
  })
  using extensionManagementWorker = ExtensionManagementWorker.registerMockRpc({
    'Extensions.uninstall': () => {
      throw error
    },
  })
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      id: 'test-id',
      uri: 'test://sample-folder',
    },
  }
  const result = await HandleClickUninstall.handleClickUninstall(state)

  expect(result).toBe(state)
  expect(extensionManagementWorker.invocations).toEqual([['Extensions.uninstall', 'test-id']])
  expect(rendererWorker.invocations).toEqual([['ErrorHandling.showErrorDialog', error]])
})
