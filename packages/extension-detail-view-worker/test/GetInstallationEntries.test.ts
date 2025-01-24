import { expect, test } from '@jest/globals'
import * as GetInstallationEntries from '../src/parts/GetInstallationEntries/GetInstallationEntries.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'

test('get installation entries with all fields', () => {
  expect(GetInstallationEntries.getInstallationEntries('2.5MB', 'test-extension', '1.0.0')).toEqual([
    {
      key: 'Identifier',
      value: 'test-extension',
      odd: true,
      code: true,
    },
    {
      key: 'Version',
      value: '1.0.0',
      code: true,
    },
    {
      key: 'Last Updated',
      value: 'n/a',
      odd: true,
    },
    {
      key: 'Size',
      value: '2.5MB',
      onClick: DomEventListenerFunctions.HandleClickSize,
    },
  ])
})

test('get installation entries with builtin true', () => {
  expect(GetInstallationEntries.getInstallationEntries('500KB', 'test-extension', '1.0.0')).toEqual([
    {
      key: 'Identifier',
      value: 'test-extension',
      odd: true,
      code: true,
    },
    {
      key: 'Version',
      value: '1.0.0',
      code: true,
    },
    {
      key: 'Last Updated',
      value: 'n/a',
      odd: true,
    },
    {
      key: 'Size',
      value: '500KB',
      onClick: DomEventListenerFunctions.HandleClickSize,
    },
  ])
})

test('get installation entries with disabled true', () => {
  expect(GetInstallationEntries.getInstallationEntries('1.2MB', 'test-extension', '1.0.0')).toEqual([
    {
      key: 'Identifier',
      value: 'test-extension',
      odd: true,
      code: true,
    },
    {
      key: 'Version',
      value: '1.0.0',
      code: true,
    },
    {
      key: 'Last Updated',
      value: 'n/a',
      odd: true,
    },
    {
      key: 'Size',
      value: '1.2MB',
      onClick: DomEventListenerFunctions.HandleClickSize,
    },
  ])
})

test('get installation entries with missing fields', () => {
  expect(GetInstallationEntries.getInstallationEntries('0KB', 'test-extension', '')).toEqual([
    {
      key: 'Identifier',
      value: 'test-extension',
      odd: true,
      code: true,
    },
    {
      key: 'Version',
      value: '',
      code: true,
    },
    {
      key: 'Last Updated',
      value: 'n/a',
      odd: true,
    },
    {
      key: 'Size',
      value: '0KB',
      onClick: DomEventListenerFunctions.HandleClickSize,
    },
  ])
})
