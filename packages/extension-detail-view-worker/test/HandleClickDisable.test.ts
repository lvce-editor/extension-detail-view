import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickDisable } from '../src/parts/HandleClickDisable/HandleClickDisable.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handleClickDisable calls disableExtension with extensionId and returns state', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.disable') {
        return
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState()
  const result = await handleClickDisable(state)

  expect(result).toBe(state)
})

test('handleClickDisable handles error from disableExtension', async () => {
  const error = new Error('Failed to disable extension')
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, ...args: readonly any[]) => {
      if (method === 'ExtensionManagement.disable') {
        throw error
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState()
  await expect(handleClickDisable(state)).rejects.toThrow('Failed to disable extension')
})
