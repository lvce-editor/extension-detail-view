import { expect, test } from '@jest/globals'
import * as GetDescription from '../src/parts/GetDescription/GetDescription.ts'

test('gets description from extension detail', () => {
  const extensionDetail = {
    name: 'Test Extension',
    description: 'Test Description',
    iconSrc: './test-icon.png',
  }
  expect(GetDescription.getDescription(extensionDetail)).toBe('Test Description')
})

test('handles missing description', () => {
  const extensionDetail = {
    name: 'Test Extension',
    iconSrc: './test-icon.png',
  }
  expect(GetDescription.getDescription(extensionDetail)).toBe('n/a')
})

test('handles empty description', () => {
  const extensionDetail = {
    name: 'Test Extension',
    description: '',
    iconSrc: './test-icon.png',
  }
  expect(GetDescription.getDescription(extensionDetail)).toBe('n/a')
})

test('handles null description', () => {
  const extensionDetail = {
    name: 'Test Extension',
    description: null,
    iconSrc: './test-icon.png',
  }
  expect(GetDescription.getDescription(extensionDetail)).toBe('n/a')
})
