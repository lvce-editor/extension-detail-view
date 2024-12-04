import { expect, test } from '@jest/globals'
import * as Path from '../src/parts/Path/Path.ts'

test.skip('join with empty paths', () => {
  expect(Path.join('')).toBe('/')
  expect(Path.join('', '')).toBe('/')
})

test.skip('join with single path', () => {
  expect(Path.join('/test')).toBe('/test')
  expect(Path.join('test')).toBe('/test')
})

test.skip('join multiple paths', () => {
  expect(Path.join('/test', 'folder')).toBe('/test/folder')
  expect(Path.join('test', 'folder')).toBe('/test/folder')
  expect(Path.join('/test', '/folder')).toBe('/test/folder')
})

test.skip('join handles trailing slashes', () => {
  expect(Path.join('/test/', 'folder')).toBe('/test/folder')
  expect(Path.join('/test/', '/folder/')).toBe('/test/folder')
  expect(Path.join('test/', 'folder/')).toBe('/test/folder')
})

test.skip('join handles multiple slashes', () => {
  expect(Path.join('/test//', '//folder')).toBe('/test/folder')
  expect(Path.join('//test', 'folder//')).toBe('/test/folder')
})

test.skip('join with dots', () => {
  expect(Path.join('/test', './folder')).toBe('/test/folder')
  expect(Path.join('/test', '../folder')).toBe('/folder')
  expect(Path.join('/test/sub', '../folder')).toBe('/test/folder')
})

test.skip('join preserves trailing slash if last segment is empty', () => {
  expect(Path.join('/test', '')).toBe('/test/')
  expect(Path.join('/test/folder', '')).toBe('/test/folder/')
})
