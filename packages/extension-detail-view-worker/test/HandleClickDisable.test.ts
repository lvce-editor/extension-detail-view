import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickDisable } from '../src/parts/HandleClickDisable/HandleClickDisable.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test.skip('handleClickDisable calls disableExtension with extensionId and returns state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.disable': () => {
      /**/
    },
  })

  const state = createDefaultState()
  const result = await handleClickDisable(state)

  expect(result).toBe(state)
})

test.skip('handleClickDisable handles error from disableExtension', async () => {
  const error = new Error('Failed to disable extension')
  const mockRpc = RendererWorker.registerMockRpc({
    'ExtensionManagement.disable': () => {
      throw error
    },
  })

  const state = createDefaultState()
  await expect(handleClickDisable(state)).rejects.toThrow('Failed to disable extension')
})
