import { expect, test } from '@jest/globals'
import * as Path from '../src/parts/Path/Path.ts'

test('join', () => {
  const parts = ['a', 'b']
  expect(Path.join(...parts)).toBe('a/b')
})
