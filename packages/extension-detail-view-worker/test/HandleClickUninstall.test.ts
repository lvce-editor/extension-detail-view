import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickUninstall from '../src/parts/HandleClickUninstall/HandleClickUninstall.ts'

test('handle click uninstall - calls uninstall extension', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.uninstall': () => {
      /**/
    },
  })
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      id: 'test-id',
      uri: 'test://sample-folder',
    },
  }
  await HandleClickUninstall.handleClickUninstall(state)

  expect(mockRpc.invocations).toEqual([['ExtensionManagement.uninstall', 'test-id']])
})

test('handle click uninstall - returns state unchanged', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.uninstall': () => {
      /**/
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
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.uninstall', 'test-id']])
})
