import { expect, test } from '@jest/globals'
import * as GetRepositoryLink from '../src/parts/GetRepositoryLink/GetRepositoryLink.ts'

test('getIssuesLink - extension with valid GitHub HTTPS repository link', () => {
  const extension = {
    repository: 'https://github.com/user/repo',
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('https://github.com/user/repo/issues')
})

test('getIssuesLink - extension with GitHub repository link with trailing slash', () => {
  const extension = {
    repository: 'https://github.com/user/repo/',
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('https://github.com/user/repo//issues')
})

test('getIssuesLink - extension with GitHub repository link with path', () => {
  const extension = {
    repository: 'https://github.com/user/repo/tree/main',
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('https://github.com/user/repo/tree/main/issues')
})

test('getIssuesLink - extension with non-GitHub HTTPS repository link', () => {
  const extension = {
    repository: 'https://gitlab.com/user/repo',
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - extension with HTTP repository link', () => {
  const extension = {
    repository: 'http://github.com/user/repo',
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - extension with invalid URL', () => {
  const extension = {
    repository: 'not-a-valid-url',
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - extension without repository property', () => {
  const extension = {}
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - extension with null repository', () => {
  const extension = {
    repository: null,
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - extension with undefined repository', () => {
  const extension = {
    repository: undefined,
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - extension with non-string repository', () => {
  const extension = {
    repository: 123,
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - extension with empty string repository', () => {
  const extension = {
    repository: '',
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - extension with javascript protocol', () => {
  const extension = {
    repository: 'javascript:alert("xss")',
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - extension with file protocol', () => {
  const extension = {
    repository: 'file:///path/to/file',
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - extension with GitHub URL with query parameters', () => {
  const extension = {
    repository: 'https://github.com/user/repo?branch=dev',
  }
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('https://github.com/user/repo?branch=dev/issues')
})

test('getIssuesLink - null extension', () => {
  const extension = null
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})

test('getIssuesLink - undefined extension', () => {
  const extension = undefined
  const result = GetRepositoryLink.getIssuesLink(extension)
  expect(result).toBe('')
})
