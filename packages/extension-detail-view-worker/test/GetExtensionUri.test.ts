import { expect, test } from '@jest/globals'
import { getExtensionUri } from '../src/parts/GetExtensionUri/GetExtensionUri.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

const origin = 'https://lvce-editor.github.io'

test('resolves a web extension uri against the location origin', () => {
  expect(getExtensionUri('/about-view/hash/extensions/builtin.theme-cobalt2', PlatformType.Web, origin)).toBe(
    'https://lvce-editor.github.io/about-view/hash/extensions/builtin.theme-cobalt2',
  )
})

test('preserves an absolute web extension uri', () => {
  expect(getExtensionUri('https://example.com/extensions/test.extension', PlatformType.Web, origin)).toBe(
    'https://example.com/extensions/test.extension',
  )
})

test('preserves an electron extension uri', () => {
  expect(getExtensionUri('/home/test/extensions/test.extension', PlatformType.Electron, origin)).toBe('/home/test/extensions/test.extension')
})

test('preserves an empty extension uri', () => {
  expect(getExtensionUri('', PlatformType.Web, origin)).toBe('')
})
