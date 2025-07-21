import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import * as CopyImage from '../src/parts/CopyImage/CopyImage.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test.skip('returns state as is', () => {
  const state: ExtensionDetailState = { ...createDefaultState(), uri: 'test-uri', width: 800 }
  const result = CopyImage.copyImage(state)
  expect(result).toBe(state)
})
