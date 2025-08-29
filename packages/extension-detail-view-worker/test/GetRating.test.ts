import { test, expect } from '@jest/globals'
import { getRating, getRatingCount } from '../src/parts/GetRating/GetRating.ts'

test('getRating returns n/a for null extension', () => {
  const result = getRating(null)
  expect(result).toBe('n/a')
})

test('getRating returns n/a for undefined extension', () => {
  const result = getRating(undefined)
  expect(result).toBe('n/a')
})

test('getRating returns n/a for extension without rating data', () => {
  const extension = { name: 'test-extension' }
  const result = getRating(extension)
  expect(result).toBe('n/a')
})

test('getRating returns formatted rating from rating property', () => {
  const extension = { rating: 4.567 }
  const result = getRating(extension)
  expect(result).toBe('4.6')
})

test('getRating returns formatted rating from averageRating property', () => {
  const extension = { averageRating: 3.2 }
  const result = getRating(extension)
  expect(result).toBe('3.2')
})

test('getRating returns formatted rating from marketplace.rating', () => {
  const extension = { marketplace: { rating: 4.8 } }
  const result = getRating(extension)
  expect(result).toBe('4.8')
})

test('getRating returns formatted rating from marketplace.averageRating', () => {
  const extension = { marketplace: { averageRating: 2.9 } }
  const result = getRating(extension)
  expect(result).toBe('2.9')
})

test('getRating returns formatted rating from packageJSON.rating', () => {
  const extension = { packageJSON: { rating: 5 } }
  const result = getRating(extension)
  expect(result).toBe('5.0')
})

test('getRating returns formatted rating from packageJSON.averageRating', () => {
  const extension = { packageJSON: { averageRating: 1.5 } }
  const result = getRating(extension)
  expect(result).toBe('1.5')
})

test('getRatingCount returns empty string for null extension', () => {
  const result = getRatingCount(null)
  expect(result).toBe('')
})

test('getRatingCount returns empty string for undefined extension', () => {
  const result = getRatingCount(undefined)
  expect(result).toBe('')
})

test('getRatingCount returns empty string for extension without rating count data', () => {
  const extension = { name: 'test-extension' }
  const result = getRatingCount(extension)
  expect(result).toBe('')
})

test('getRatingCount returns formatted rating count from ratingCount property', () => {
  const extension = { ratingCount: 1234 }
  const result = getRatingCount(extension)
  expect(result).toBe('(1,234)')
})

test('getRatingCount returns formatted rating count from reviewCount property', () => {
  const extension = { reviewCount: 567 }
  const result = getRatingCount(extension)
  expect(result).toBe('(567)')
})

test('getRatingCount returns formatted rating count from marketplace.ratingCount', () => {
  const extension = { marketplace: { ratingCount: 999 } }
  const result = getRatingCount(extension)
  expect(result).toBe('(999)')
})

test('getRatingCount returns formatted rating count from marketplace.reviewCount', () => {
  const extension = { marketplace: { reviewCount: 2500 } }
  const result = getRatingCount(extension)
  expect(result).toBe('(2,500)')
})

test('getRatingCount returns formatted rating count from packageJSON.ratingCount', () => {
  const extension = { packageJSON: { ratingCount: 100 } }
  const result = getRatingCount(extension)
  expect(result).toBe('(100)')
})

test('getRatingCount returns formatted rating count from packageJSON.reviewCount', () => {
  const extension = { packageJSON: { reviewCount: 5000 } }
  const result = getRatingCount(extension)
  expect(result).toBe('(5,000)')
})