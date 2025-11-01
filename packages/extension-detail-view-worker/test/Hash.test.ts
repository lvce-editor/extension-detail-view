import { test, expect } from '@jest/globals'
import { hash } from '../src/parts/Hash/Hash.ts'

test('hash returns correct SHA-256 hash for empty string', async () => {
  const result = await hash('')
  expect(result).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
})

test('hash returns correct SHA-256 hash for simple string', async () => {
  const result = await hash('hello')
  expect(result).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')
})

test('hash returns correct SHA-256 hash for longer string', async () => {
  const result = await hash('hello world')
  expect(result).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9')
})

test('hash returns same hash for same input', async () => {
  const input = 'test input'
  const result1 = await hash(input)
  const result2 = await hash(input)
  expect(result1).toBe(result2)
})

test('hash returns different hash for different input', async () => {
  const result1 = await hash('input1')
  const result2 = await hash('input2')
  expect(result1).not.toBe(result2)
})

test('hash returns hex string of correct length', async () => {
  const result = await hash('test')
  expect(result).toHaveLength(64)
  expect(result).toMatch(/^[0-9a-f]+$/)
})
