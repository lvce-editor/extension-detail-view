import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getExtensionInfoText } from '../src/parts/GetExtensionInfoText/GetExtensionInfoText.ts'

test('formats extension information like VS Code', () => {
  const state = {
    ...createDefaultState(),
    description: 'A useful extension',
    extension: {
      publisherDisplayName: 'Test Publisher',
      url: 'https://marketplace.example/test.extension',
    },
    extensionId: 'test.extension',
    extensionVersion: '1.2.3',
    name: 'Test Extension',
  }
  expect(getExtensionInfoText(state)).toBe(
    [
      'Name: Test Extension',
      'Id: test.extension',
      'Description: A useful extension',
      'Version: 1.2.3',
      'Publisher: Test Publisher',
      'VS Marketplace Link: https://marketplace.example/test.extension',
    ].join('\n'),
  )
})

test('omits an unavailable marketplace link and falls back to the publisher id', () => {
  const state = {
    ...createDefaultState(),
    description: '',
    extension: {
      publisher: 'test-publisher',
    },
    extensionId: 'test.extension',
    extensionVersion: 'n/a',
    name: 'Test Extension',
  }
  expect(getExtensionInfoText(state)).toBe(
    ['Name: Test Extension', 'Id: test.extension', 'Description: ', 'Version: n/a', 'Publisher: test-publisher'].join('\n'),
  )
})
