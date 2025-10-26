import { expect, test } from '@jest/globals'
import * as GetDisplaySize from '../src/parts/GetDisplaySize/GetDisplaySize.ts'

test('zero bytes', () => {
  const size = 0
  expect(GetDisplaySize.getDisplaySize(size)).toBe('0 B')
})

test('1 byte', () => {
  const size = 1
  expect(GetDisplaySize.getDisplaySize(size)).toBe('1 B')
})

test('1 kilobyte', () => {
  const size = 1 * 1024
  expect(GetDisplaySize.getDisplaySize(size)).toBe('1 kB')
})

test('1 megabyte', () => {
  const size = 1 * 1024 ** 2
  expect(GetDisplaySize.getDisplaySize(size)).toBe('1 MB')
})

test('1 gigabyte', () => {
  const size = 1 * 1024 ** 3
  expect(GetDisplaySize.getDisplaySize(size)).toBe('1 GB')
})
