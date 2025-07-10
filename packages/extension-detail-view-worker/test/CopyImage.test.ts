import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as CopyImage from '../src/parts/CopyImage/CopyImage.ts'

test('returns state as is', () => {
  const state = createDefaultState({ uri: 'test-uri', width: 800 })
  const result = CopyImage.copyImage(state)
  expect(result).toBe(state)
})