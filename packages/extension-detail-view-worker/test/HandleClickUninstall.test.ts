import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickUninstall from '../src/parts/HandleClickUninstall/HandleClickUninstall.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handle click uninstall - calls uninstall extension', async () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      uri: 'test://sample-folder',
      id: 'test-id',
    },
  }
  await HandleClickUninstall.handleClickUninstall(state)

  expect(invoke).toHaveBeenCalledWith('ExtensionManagement.uninstall', 'test-id')
})

test('handle click uninstall - returns state unchanged', async () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    extension: {
      uri: 'test://sample-folder',
      id: 'test-id',
    },
  }
  const result = await HandleClickUninstall.handleClickUninstall(state)

  expect(result).toBe(state)
})