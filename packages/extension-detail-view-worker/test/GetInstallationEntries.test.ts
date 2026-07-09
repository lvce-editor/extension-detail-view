import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetInstallationEntries from '../src/parts/GetInstallationEntries/GetInstallationEntries.ts'

test('get installation entries with all fields', () => {
  const showSizeLink = true

  expect(GetInstallationEntries.getInstallationEntries('2.5MB', 'test-extension', '1.0.0', '/test/path', showSizeLink, null, null)).toEqual([
    {
      code: true,
      key: 'Identifier',
      odd: true,
      value: 'test-extension',
    },
    {
      code: true,
      key: 'Version',
      value: '1.0.0',
    },
    {
      key: 'Last Updated',
      odd: true,
      value: 'n/a',
    },
    {
      key: 'Size',
      onClick: DomEventListenerFunctions.HandleClickSize,
      title: '/test/path',
      value: '2.5MB',
    },
  ])
})

test('get installation entries with builtin true', () => {
  const showSizeLink = true

  expect(GetInstallationEntries.getInstallationEntries('500KB', 'test-extension', '1.0.0', '/test/path', showSizeLink, null, null)).toEqual([
    {
      code: true,
      key: 'Identifier',
      odd: true,
      value: 'test-extension',
    },
    {
      code: true,
      key: 'Version',
      value: '1.0.0',
    },
    {
      key: 'Last Updated',
      odd: true,
      value: 'n/a',
    },
    {
      key: 'Size',
      onClick: DomEventListenerFunctions.HandleClickSize,
      title: '/test/path',
      value: '500KB',
    },
  ])
})

test('get installation entries with disabled true', () => {
  const showSizeLink = true
  expect(GetInstallationEntries.getInstallationEntries('1.2MB', 'test-extension', '1.0.0', '/test/path', showSizeLink, null, null)).toEqual([
    {
      code: true,
      key: 'Identifier',
      odd: true,
      value: 'test-extension',
    },
    {
      code: true,
      key: 'Version',
      value: '1.0.0',
    },
    {
      key: 'Last Updated',
      odd: true,
      value: 'n/a',
    },
    {
      key: 'Size',
      onClick: DomEventListenerFunctions.HandleClickSize,
      title: '/test/path',
      value: '1.2MB',
    },
  ])
})

test('get installation entries with missing fields', () => {
  const showSizeLink = true

  expect(GetInstallationEntries.getInstallationEntries('0KB', 'test-extension', '', '/test/path', showSizeLink, null, null)).toEqual([
    {
      code: true,
      key: 'Identifier',
      odd: true,
      value: 'test-extension',
    },
    {
      code: true,
      key: 'Version',
      value: '',
    },
    {
      key: 'Last Updated',
      odd: true,
      value: 'n/a',
    },
    {
      key: 'Size',
      onClick: DomEventListenerFunctions.HandleClickSize,
      title: '/test/path',
      value: '0KB',
    },
  ])
})

test('get installation entries with valid lastUpdated timestamp', () => {
  const showSizeLink = true
  const lastUpdated = new Date('2024-01-15').getTime()
  const result = GetInstallationEntries.getInstallationEntries('1.0MB', 'test-extension', '1.0.0', '/test/path', showSizeLink, null, lastUpdated)
  expect(result[2].key).toBe('Last Updated')
  expect(result[2].value).not.toBe('n/a')
  expect(result[2].value).toBe('Jan 27, 56008')
})

test('get installation entries with created timestamp', () => {
  const showSizeLink = true
  const created = new Date('2024-01-15').getTime()
  const result = GetInstallationEntries.getInstallationEntries('1.0MB', 'test-extension', '1.0.0', '/test/path', showSizeLink, created, null)
  expect(result[2].key).toBe('Created')
  expect(result[2].value).not.toBe('n/a')
  expect(result[3].key).toBe('Last Updated')
  expect(result[4].key).toBe('Size')
  expect(result[4].odd).toBe(true)
})
