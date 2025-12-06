import { expect, test } from '@jest/globals'
import { getIcon } from '../src/parts/GetIcon/GetIcon.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

const assetDir = '/assets'

test('getIcon returns default icon for null extension', () => {
  const result = getIcon(null, PlatformType.Web, assetDir)
  expect(result).toBe(`${assetDir}/icons/extensionDefaultIcon.png`)
})

test('getIcon returns default icon for undefined extension', () => {
  const result = getIcon(undefined, PlatformType.Web, assetDir)
  expect(result).toBe(`${assetDir}/icons/extensionDefaultIcon.png`)
})

test('getIcon returns default icon for extension without path and icon', () => {
  const extension = { name: 'Test Extension' }
  const result = getIcon(extension, PlatformType.Web, assetDir)
  expect(result).toBe(`${assetDir}/icons/extensionDefaultIcon.png`)
})

test('getIcon returns language basics icon for language basics extension without path and icon', () => {
  const extension = { name: 'Language Basics JavaScript' }
  const result = getIcon(extension, PlatformType.Web, assetDir)
  expect(result).toBe(`${assetDir}/icons/language-icon.svg`)
})

test('getIcon returns theme icon for theme extension without path and icon', () => {
  const extension = { name: 'Dark Theme' }
  const result = getIcon(extension, PlatformType.Web, assetDir)
  expect(result).toBe(`${assetDir}/icons/theme-icon.png`)
})

test('getIcon returns remote path for Electron platform with builtin extension', () => {
  const extension = {
    builtin: true,
    icon: 'icon.png',
    id: 'builtin.extension',
    path: '/path/to/extension',
  }
  const result = getIcon(extension, PlatformType.Electron, assetDir)
  expect(result).toBe(`${assetDir}/extensions/builtin.extension/icon.png`)
})

test('getIcon returns remote path for Electron platform with non-builtin extension', () => {
  const extension = {
    builtin: false,
    icon: 'icon.png',
    id: 'test.extension',
    path: '/path/to/extension',
  }
  const result = getIcon(extension, PlatformType.Electron, assetDir)
  expect(result).toBe(`/remote/${extension.path}/${extension.icon}`)
})

test('getIcon returns remote path for Remote platform', () => {
  const extension = {
    builtin: true,
    icon: 'icon.png',
    id: 'test.extension',
    path: '/path/to/extension',
  }
  const result = getIcon(extension, PlatformType.Remote, assetDir)
  expect(result).toBe(`${assetDir}/extensions/test.extension/icon.png`)
})

test('getIcon returns empty string for Web platform with path and icon', () => {
  const extension = {
    icon: 'icon.png',
    id: 'test.extension',
    path: '/path/to/extension',
  }
  const result = getIcon(extension, PlatformType.Web, assetDir)
  expect(result).toBe('')
})

test('getIcon prefers language basics over theme when both conditions match', () => {
  const extension = { name: 'Language Basics Theme' }
  const result = getIcon(extension, PlatformType.Web, assetDir)
  expect(result).toBe(`${assetDir}/icons/language-icon.svg`)
})
