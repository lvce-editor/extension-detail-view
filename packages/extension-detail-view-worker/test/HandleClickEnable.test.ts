import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickEnable from '../src/parts/HandleClickEnable/HandleClickEnable.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test.skip('handleClickEnable calls enableExtension with extensionId and returns state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.enable': () => {
      /**/
    },
  })

  const state = CreateDefaultState.createDefaultState()
  const result = await HandleClickEnable.handleClickEnable(state)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ExtensionManagement.enable', state.extension.id]])
})

test.skip('handleClickEnable handles error from enableExtension', async () => {
  const error = new Error('Failed to enable extension')
  RendererWorker.registerMockRpc({
    'ExtensionManagement.enable': () => {
      throw error
    },
  })

  const state = CreateDefaultState.createDefaultState()
  await expect(HandleClickEnable.handleClickEnable(state)).rejects.toThrow('Failed to enable extension')
})
