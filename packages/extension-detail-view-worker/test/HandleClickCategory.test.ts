import { test, expect } from '@jest/globals'
import * as createDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleClickCategory from '../src/parts/HandleClickCategory/HandleClickCategory.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

test('handleClickCategory should call openExtensionSearch with category search', async () => {
  const state = createDefaultState.createDefaultState()
  const categoryId = 'programming-languages'

  const mockRpc = RendererWorker.registerMockRpc({
    'SideBar.openViewlet': () => {
      /**/
    },
    'Extensions.handleInput': () => {
      /**/
    },
  })

  const result = await HandleClickCategory.handleClickCategory(state, categoryId)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    ['SideBar.openViewlet', 'Extensions'],
    ['Extensions.handleInput', `@category:"${categoryId}"`],
  ])
})

test('handleClickCategory should return state unchanged when categoryId is empty', async () => {
  const state = createDefaultState.createDefaultState()
  const categoryId = ''

  const result = await HandleClickCategory.handleClickCategory(state, categoryId)

  expect(result).toBe(state)
})
