import { expect, test } from '@jest/globals'
import * as GetRepositoryLink from '../src/parts/GetRepositoryLink/GetRepositoryLink.ts'

test('getRepositoryLink - extension with valid HTTPS repository link', () => {
  const extension = {
    repository: 'https://github.com/user/repo',
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('https://github.com/user/repo')
})

test('getRepositoryLink - extension with HTTP repository link', () => {
  const extension = {
    repository: 'http://github.com/user/repo',
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})

test('getRepositoryLink - extension with invalid URL', () => {
  const extension = {
    repository: 'not-a-valid-url',
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})

test('getRepositoryLink - extension without repository property', () => {
  const extension = {}
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})

test('getRepositoryLink - extension with null repository', () => {
  const extension = {
    repository: null,
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})

test('getRepositoryLink - extension with undefined repository', () => {
  const extension = {
    repository: undefined,
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})

test('getRepositoryLink - extension with non-string repository', () => {
  const extension = {
    repository: 123,
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})

test('getRepositoryLink - extension with empty string repository', () => {
  const extension = {
    repository: '',
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})

test('getRepositoryLink - extension with javascript protocol', () => {
  const extension = {
    repository: 'javascript:alert("xss")',
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})

test('getRepositoryLink - extension with file protocol', () => {
  const extension = {
    repository: 'file:///path/to/file',
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})

test('getRepositoryLink - extension with https URL with path and query', () => {
  const extension = {
    repository: 'https://github.com/user/repo/tree/main?branch=dev',
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('https://github.com/user/repo/tree/main?branch=dev')
})

test('getRepositoryLink - extension with https URL with port', () => {
  const extension = {
    repository: 'https://github.com:443/user/repo',
  }
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('https://github.com:443/user/repo')
})

test('getRepositoryLink - null extension', () => {
  const extension = null
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})

test('getRepositoryLink - undefined extension', () => {
  const extension = undefined
  const result = GetRepositoryLink.getRepositoryLink(extension)
  expect(result).toBe('')
})
