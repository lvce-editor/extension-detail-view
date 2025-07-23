import { test, expect } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as createDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickCategory from '../src/parts/HandleClickCategory/HandleClickCategory.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handleClickCategory should call openExtensionSearch with category search', async () => {
  const state = createDefaultState.createDefaultState()
  const categoryId = 'programming-languages'

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: () => undefined,
  })
  RendererWorker.set(mockRpc)

  const result = await HandleClickCategory.handleClickCategory(state, categoryId)

  expect(result).toBe(state)
})

test('handleClickCategory should return state unchanged when categoryId is empty', async () => {
  const state = createDefaultState.createDefaultState()
  const categoryId = ''

  const result = await HandleClickCategory.handleClickCategory(state, categoryId)

  expect(result).toBe(state)
})
