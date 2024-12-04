import { expect, test } from '@jest/globals'
import * as ExtensionDisplay from '../src/parts/ExtensionDisplay/ExtensionDisplay.ts'
import * as Icon from '../src/parts/Icon/Icon.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('getName returns name when available', () => {
  expect(ExtensionDisplay.getName({ name: 'Test Extension' })).toBe('Test Extension')
})

test('getName returns id when name is not available', () => {
  expect(ExtensionDisplay.getName({ id: 'test-id' })).toBe('test-id')
})

test('getName returns n/a for invalid extension', () => {
  expect(ExtensionDisplay.getName(undefined)).toBe('n/a')
  expect(ExtensionDisplay.getName(null)).toBe('n/a')
  expect(ExtensionDisplay.getName({})).toBe('n/a')
})

test('getIcon returns default icon for invalid extension', () => {
  expect(ExtensionDisplay.getIcon(null, PlatformType.Remote)).toBe(Icon.ExtensionDefaultIcon)
  expect(ExtensionDisplay.getIcon(undefined, PlatformType.Remote)).toBe(Icon.ExtensionDefaultIcon)
})

test('getIcon returns language basics icon', () => {
  expect(ExtensionDisplay.getIcon({ name: 'Language Basics Test' }, PlatformType.Remote)).toBe(Icon.ExtensionLanguageBasics)
})

test('getIcon returns theme icon', () => {
  expect(ExtensionDisplay.getIcon({ name: 'Test Theme' }, PlatformType.Remote)).toBe(Icon.ExtensionTheme)
})

test('getIcon returns remote path for non-builtin extension', () => {
  const extension = {
    path: 'test/path',
    icon: 'icon.png',
    builtin: false,
  }
  expect(ExtensionDisplay.getIcon(extension, PlatformType.Remote)).toBe('/remote/test/path/icon.png')
})

test('getIcon returns asset path for builtin extension', () => {
  const extension = {
    id: 'test-ext',
    path: 'test/path',
    icon: 'icon.png',
    builtin: true,
  }
  expect(ExtensionDisplay.getIcon(extension, PlatformType.Remote)).toBe('/extensions/test-ext/icon.png')
})

test('getIcon returns empty string for web platform', () => {
  const extension = {
    path: 'test/path',
    icon: 'icon.png',
  }
  expect(ExtensionDisplay.getIcon(extension, PlatformType.Web)).toBe('')
})
