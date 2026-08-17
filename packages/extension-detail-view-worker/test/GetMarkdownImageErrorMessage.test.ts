import { expect, test } from '@jest/globals'
import * as GetMarkdownImageErrorMessage from '../src/parts/GetMarkdownImageErrorMessage/GetMarkdownImageErrorMessage.ts'

test('returns Gitpod-specific text for a Gitpod image', () => {
  expect(GetMarkdownImageErrorMessage.getMarkdownImageErrorMessage('https://gitpod.io/button/open-in-gitpod.svg')).toBe('Gitpod Image failed to load')
})

test('returns Gitpod-specific text for an image on a Gitpod subdomain', () => {
  expect(GetMarkdownImageErrorMessage.getMarkdownImageErrorMessage('https://assets.gitpod.io/image.png')).toBe('Gitpod Image failed to load')
})

test('returns generic text for a non-Gitpod image', () => {
  expect(GetMarkdownImageErrorMessage.getMarkdownImageErrorMessage('https://example.com/image.png')).toBe('Image cannot be loaded')
})

test('returns generic text for a deceptive Gitpod hostname', () => {
  expect(GetMarkdownImageErrorMessage.getMarkdownImageErrorMessage('https://gitpod.io.example.com/image.png')).toBe('Image cannot be loaded')
})

test('returns generic text for a relative image', () => {
  expect(GetMarkdownImageErrorMessage.getMarkdownImageErrorMessage('./image.png')).toBe('Image cannot be loaded')
})

test('returns generic text for an invalid image source', () => {
  expect(GetMarkdownImageErrorMessage.getMarkdownImageErrorMessage('https://[')).toBe('Image cannot be loaded')
})

test('returns generic text for a missing image source', () => {
  expect(GetMarkdownImageErrorMessage.getMarkdownImageErrorMessage(undefined)).toBe('Image cannot be loaded')
})
