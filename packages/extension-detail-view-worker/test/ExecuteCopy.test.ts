import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as ExecuteCopy from '../src/parts/ExecuteCopy/ExecuteCopy.ts'

test('executeCopy returns state unchanged', async () => {
  const state: ExtensionDetailState = createDefaultState()
  const result = await ExecuteCopy.executeCopy(state)
  expect(result).toBe(state)
})
