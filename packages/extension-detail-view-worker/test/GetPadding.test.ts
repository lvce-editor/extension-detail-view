import { expect, test } from '@jest/globals'
import * as GetPadding from '../src/parts/GetPadding/GetPadding.ts'

test('padding: below 600', () => {
  expect(GetPadding.getPadding(599)).toBe(10)
})

test('padding: 600-799 fixed 10', () => {
  expect(GetPadding.getPadding(600)).toBe(10)
  expect(GetPadding.getPadding(799)).toBe(10)
})

test('padding: 800 exactly', () => {
  expect(GetPadding.getPadding(800)).toBe(10)
})

test('padding: fluid between 800 and 1200', () => {
  expect(GetPadding.getPadding(900)).toBe(15)
  expect(GetPadding.getPadding(1000)).toBe(20)
  expect(GetPadding.getPadding(1100)).toBe(25)
  expect(GetPadding.getPadding(1199)).toBe(30)
})

test('padding: 1200 and above', () => {
  expect(GetPadding.getPadding(1200)).toBe(30)
  expect(GetPadding.getPadding(1600)).toBe(30)
})
