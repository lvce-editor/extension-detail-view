import { expect, test } from '@jest/globals'
import * as GetLicenseLink from '../src/parts/GetLicenseLink/GetLicenseLink.ts'

test('getLicenseLink - extension with valid GitHub HTTPS repository link', () => {
  const extension = {
    repository: 'https://github.com/user/repo',
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('https://github.com/user/repo/blob/main/license.md')
})

test('getLicenseLink - extension with GitHub repository link with trailing slash', () => {
  const extension = {
    repository: 'https://github.com/user/repo/',
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('https://github.com/user/repo/blob/main/license.md')
})

test('getLicenseLink - extension with GitHub repository link with path', () => {
  const extension = {
    repository: 'https://github.com/user/repo/tree/main',
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('https://github.com/user/repo/tree/main/blob/main/license.md')
})

test('getLicenseLink - extension with non-GitHub HTTPS repository link', () => {
  const extension = {
    repository: 'https://gitlab.com/user/repo',
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - extension with HTTP repository link', () => {
  const extension = {
    repository: 'http://github.com/user/repo',
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - extension with invalid URL', () => {
  const extension = {
    repository: 'not-a-valid-url',
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - extension without repository property', () => {
  const extension = {}
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - extension with null repository', () => {
  const extension = {
    repository: null,
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - extension with undefined repository', () => {
  const extension = {
    repository: undefined,
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - extension with non-string repository', () => {
  const extension = {
    repository: 123,
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - extension with empty string repository', () => {
  const extension = {
    repository: '',
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - extension with javascript protocol', () => {
  const extension = {
    repository: 'javascript:alert("xss")',
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - extension with file protocol', () => {
  const extension = {
    repository: 'file:///path/to/file',
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - extension with GitHub URL with query parameters', () => {
  const extension = {
    repository: 'https://github.com/user/repo?branch=dev',
  }
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('https://github.com/user/repo?branch=dev/blob/main/license.md')
})

test('getLicenseLink - null extension', () => {
  const extension = null
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})

test('getLicenseLink - undefined extension', () => {
  const extension = undefined
  const result = GetLicenseLink.getLicenseLink(extension)
  expect(result).toBe('#')
})
