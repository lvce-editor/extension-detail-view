import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleClickEnable } from '../src/parts/HandleClickEnable/HandleClickEnable.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handleClickEnable calls enableExtension with extensionId and returns state', async () => {
  const invoke = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState()
  const result = await handleClickEnable(state)

  expect(result).toBe(state)
})

test('handleClickEnable handles error from enableExtension', async () => {
  const error = new Error('Failed to enable extension')
  const invoke = jest.fn<(...args: readonly any[]) => Promise<any>>().mockRejectedValue(error)
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const state = createDefaultState()
  await expect(handleClickEnable(state)).rejects.toThrow('Failed to enable extension')
})
