import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { resize } from '../src/parts/Resize/Resize.ts'

test.skip('resize merges dimensions into state', () => {
  const state = createDefaultState()
  const dimensions = { x: 0, y: 0, width: 800, height: 600 }
  const result = resize(state, dimensions)

  expect(result.width).toBe(800)
  expect(result).toEqual({ ...state, ...dimensions })
})
