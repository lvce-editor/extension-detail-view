import { expect, test } from '@jest/globals'
import * as Interpolate from '../src/parts/Interpolate/Interpolate.ts'

test('interpolate: basic midpoint', () => {
  expect(Interpolate.interpolate(0.5, 0, 1, 0, 100)).toBe(50)
})

test('interpolate: clamped below', () => {
  expect(Interpolate.interpolate(-10, 0, 100, 0, 10)).toBe(0)
})

test('interpolate: clamped above', () => {
  expect(Interpolate.interpolate(150, 0, 100, 0, 10)).toBe(10)
})

test('interpolate: round result', () => {
  expect(Interpolate.interpolate(25, 0, 100, 0, 3)).toBe(1)
  expect(Interpolate.interpolate(75, 0, 100, 0, 3)).toBe(2)
})

test('interpolate: inMin equals inMax returns rounded outMin', () => {
  expect(Interpolate.interpolate(10, 5, 5, 2.4, 9.9)).toBe(2)
})
