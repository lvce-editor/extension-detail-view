import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickUninstall from '../src/parts/HandleClickUninstall/HandleClickUninstall.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test('handle click uninstall - calls uninstall extension', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.uninstall': () => {
      /**/
    },
  })
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      uri: 'test://sample-folder',
      id: 'test-id',
    },
  }
  await HandleClickUninstall.handleClickUninstall(state)

  expect(mockRpc.invocations).toEqual([['ExtensionManagement.uninstall', 'test-id']])
})

test('handle click uninstall - returns state unchanged', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.uninstall': () => {
      /**/
    },
  })
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      uri: 'test://sample-folder',
      id: 'test-id',
    },
  }
  const result = await HandleClickUninstall.handleClickUninstall(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.uninstall', 'test-id']])
})
