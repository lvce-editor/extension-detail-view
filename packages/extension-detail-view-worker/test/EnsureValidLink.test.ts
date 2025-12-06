import { expect, test } from '@jest/globals'
import * as EnsureValidLink from '../src/parts/EnsureValidLink/EnsureValidLink.ts'

test('ensureValidLink - valid HTTPS URL', () => {
  const result: string = EnsureValidLink.ensureValidLink('https://github.com/user/repo')
  expect(result).toBe('https://github.com/user/repo')
})

test('ensureValidLink - HTTP URL returns empty string', () => {
  const result: string = EnsureValidLink.ensureValidLink('http://github.com/user/repo')
  expect(result).toBe('')
})

test('ensureValidLink - empty string returns empty string', () => {
  const result: string = EnsureValidLink.ensureValidLink('')
  expect(result).toBe('')
})

test('ensureValidLink - invalid URL returns empty string', () => {
  const result: string = EnsureValidLink.ensureValidLink('not-a-valid-url')
  expect(result).toBe('')
})

test('ensureValidLink - javascript protocol returns empty string', () => {
  const result: string = EnsureValidLink.ensureValidLink('javascript:alert("xss")')
  expect(result).toBe('')
})

test('ensureValidLink - file protocol returns empty string', () => {
  const result: string = EnsureValidLink.ensureValidLink('file:///path/to/file')
  expect(result).toBe('')
})

test('ensureValidLink - https URL with path and query', () => {
  const result: string = EnsureValidLink.ensureValidLink('https://github.com/user/repo/tree/main?branch=dev')
  expect(result).toBe('https://github.com/user/repo/tree/main?branch=dev')
})

test('ensureValidLink - https URL with port', () => {
  const result: string = EnsureValidLink.ensureValidLink('https://github.com:443/user/repo')
  expect(result).toBe('https://github.com:443/user/repo')
})

test('ensureValidLink - https URL with hash', () => {
  const result: string = EnsureValidLink.ensureValidLink('https://github.com/user/repo#section')
  expect(result).toBe('https://github.com/user/repo#section')
})

test('ensureValidLink - https URL with subdomain', () => {
  const result: string = EnsureValidLink.ensureValidLink('https://www.example.com/path')
  expect(result).toBe('https://www.example.com/path')
})

test('ensureValidLink - ftp protocol returns empty string', () => {
  const result: string = EnsureValidLink.ensureValidLink('ftp://example.com/file')
  expect(result).toBe('')
})

test('ensureValidLink - data protocol returns empty string', () => {
  const result: string = EnsureValidLink.ensureValidLink('data:text/plain,test')
  expect(result).toBe('')
})
