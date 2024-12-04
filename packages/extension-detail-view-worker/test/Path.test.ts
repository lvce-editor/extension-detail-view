import { expect, test } from '@jest/globals'
import * as Path from '../src/parts/Path/Path.ts'

test('join', () => {
  const separator = '/'
  const parts = ['a', 'b']
  expect(Path.join(separator, ...parts)).toBe('a/b')
})
