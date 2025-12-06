import { expect, test } from '@jest/globals'
import * as GetDescription from '../src/parts/GetDescription/GetDescription.ts'

test('gets description from extension detail', () => {
  const extensionDetail = {
    description: 'Test Description',
    iconSrc: './test-icon.png',
    name: 'Test Extension',
  }
  expect(GetDescription.getDescription(extensionDetail)).toBe('Test Description')
})

test('handles missing description', () => {
  const extensionDetail = {
    iconSrc: './test-icon.png',
    name: 'Test Extension',
  }
  expect(GetDescription.getDescription(extensionDetail)).toBe('n/a')
})

test('handles empty description', () => {
  const extensionDetail = {
    description: '',
    iconSrc: './test-icon.png',
    name: 'Test Extension',
  }
  expect(GetDescription.getDescription(extensionDetail)).toBe('n/a')
})

test('handles null description', () => {
  const extensionDetail = {
    description: null,
    iconSrc: './test-icon.png',
    name: 'Test Extension',
  }
  expect(GetDescription.getDescription(extensionDetail)).toBe('n/a')
})
