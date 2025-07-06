import { expect, test } from '@jest/globals'
import * as HasColorThemes from '../src/parts/HasColorThemes/HasColorThemes.ts'

test('has color themes - true', () => {
  const extension = {
    colorThemes: [
      { label: 'Dark Theme' },
      { label: 'Light Theme' },
    ],
  }
  expect(HasColorThemes.hasColorThemes(extension)).toBe(true)
})

test('has color themes - false', () => {
  const extension = {
    iconThemes: [{ label: 'Icon Theme' }],
  }
  expect(HasColorThemes.hasColorThemes(extension)).toBe(false)
})

test('has color themes - empty array', () => {
  const extension = {
    colorThemes: [],
  }
  expect(HasColorThemes.hasColorThemes(extension)).toBe(false)
})

test('has color themes - null extension', () => {
  expect(HasColorThemes.hasColorThemes(null)).toBe(false)
})

test('has color themes - undefined extension', () => {
  expect(HasColorThemes.hasColorThemes(undefined)).toBe(false)
})