import { expect, test } from '@jest/globals'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetInstallationEntries from '../src/parts/GetInstallationEntries/GetInstallationEntries.ts'

test('get installation entries with all fields', () => {
  const showSizeLink = true

  expect(GetInstallationEntries.getInstallationEntries('2.5MB', 'test-extension', '1.0.0', '/test/path', showSizeLink)).toEqual([
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

  expect(GetInstallationEntries.getInstallationEntries('500KB', 'test-extension', '1.0.0', '/test/path', showSizeLink)).toEqual([
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
  expect(GetInstallationEntries.getInstallationEntries('1.2MB', 'test-extension', '1.0.0', '/test/path', showSizeLink)).toEqual([
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

  expect(GetInstallationEntries.getInstallationEntries('0KB', 'test-extension', '', '/test/path', showSizeLink)).toEqual([
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
