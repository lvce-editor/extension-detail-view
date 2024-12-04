import { expect, test } from '@jest/globals'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'

test('empty strings', () => {
  expect(MergeClassNames.mergeClassNames('', '')).toBe('')
})

test('single class name', () => {
  expect(MergeClassNames.mergeClassNames('test', '')).toBe('test')
  expect(MergeClassNames.mergeClassNames('', 'test')).toBe('test')
})

test('multiple class names', () => {
  expect(MergeClassNames.mergeClassNames('test1', 'test2')).toBe('test1 test2')
})

test.skip('handles whitespace', () => {
  expect(MergeClassNames.mergeClassNames('  test1  ', ' test2 ')).toBe('test1 test2')
})
