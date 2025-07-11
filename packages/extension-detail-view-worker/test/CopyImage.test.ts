import { expect, test } from '@jest/globals'
import * as CopyImage from '../src/parts/CopyImage/CopyImage.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('returns state as is', () => {
  const state = createDefaultState({ uri: 'test-uri', width: 800 })
  const result = CopyImage.copyImage(state)
  expect(result).toBe(state)
})
