import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { hideSizeLink } from '../src/parts/HideSizeLink/HideSizeLink.ts'

test('hideSizeLink sets showSizeLink to false', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    displaySize: '2.5MB',
    extensionId: 'test-extension',
    extensionUri: '/test/path',
    extensionVersion: '1.0.0',
    showSizeLink: true,
  }
  const result = hideSizeLink(state)
  expect(result.showSizeLink).toBe(false)
})

test('hideSizeLink removes size entry from installationEntries', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    displaySize: '2.5MB',
    extensionId: 'test-extension',
    extensionUri: '/test/path',
    extensionVersion: '1.0.0',
    showSizeLink: true,
  }
  const result = hideSizeLink(state)
  expect(result.installationEntries).toEqual([
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
  ])
})

test('hideSizeLink preserves all other state properties', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    description: 'Test Description',
    disabled: false,
    displaySize: '500KB',
    extensionId: 'another-extension',
    extensionUri: '/another/path',
    extensionVersion: '2.0.0',
    name: 'Test Extension',
    showSizeLink: true,
  }
  const result = hideSizeLink(state)
  expect(result.name).toBe('Test Extension')
  expect(result.description).toBe('Test Description')
  expect(result.disabled).toBe(false)
  expect(result.displaySize).toBe('500KB')
  expect(result.extensionId).toBe('another-extension')
  expect(result.extensionVersion).toBe('2.0.0')
  expect(result.extensionUri).toBe('/another/path')
})

test('hideSizeLink works when showSizeLink is already false', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    displaySize: '1.2MB',
    extensionId: 'test-extension',
    extensionUri: '/test/path',
    extensionVersion: '1.0.0',
    showSizeLink: false,
  }
  const result = hideSizeLink(state)
  expect(result.showSizeLink).toBe(false)
  expect(result.installationEntries).toEqual([
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
  ])
})

test('hideSizeLink works with empty extensionId and extensionVersion', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    displaySize: '0KB',
    extensionId: '',
    extensionUri: '/test/path',
    extensionVersion: '',
    showSizeLink: true,
  }
  const result = hideSizeLink(state)
  expect(result.showSizeLink).toBe(false)
  expect(result.installationEntries).toEqual([
    {
      code: true,
      key: 'Identifier',
      odd: true,
      value: '',
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
  ])
})

