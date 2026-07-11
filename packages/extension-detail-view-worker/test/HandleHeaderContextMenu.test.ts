import { expect, test } from '@jest/globals'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleHeaderContextMenu } from '../src/parts/HandleHeaderContextMenu/HandleHeaderContextMenu.ts'

test('handleHeaderContextMenu returns the same state', async () => {
  const state = CreateDefaultState.createDefaultState()

  const result = await handleHeaderContextMenu(state)

  expect(result).toBe(state)
})
