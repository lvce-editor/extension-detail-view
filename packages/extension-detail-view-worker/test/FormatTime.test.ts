import { test, expect } from '@jest/globals'
import { formatTime } from '../src/parts/FormatTime/FormatTime.ts'

test('formatTime should format integer times correctly', () => {
  const result = formatTime(100)
  expect(result).toBe('100.00ms')
})

test('formatTime should format decimal times correctly', () => {
  const result = formatTime(123.456)
  expect(result).toBe('123.46ms')
})

test('formatTime should format zero correctly', () => {
  const result = formatTime(0)
  expect(result).toBe('0.00ms')
})

test('formatTime should format very small times correctly', () => {
  const result = formatTime(0.01)
  expect(result).toBe('0.01ms')
})

test('formatTime should format large times correctly', () => {
  const result = formatTime(9999.99)
  expect(result).toBe('9999.99ms')
})

test('formatTime should handle negative times', () => {
  const result = formatTime(-123.45)
  expect(result).toBe('-123.45ms')
})
