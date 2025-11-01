import { expect, test } from '@jest/globals'
import type { ActivationEntry } from '../src/parts/ActivationEntry/ActivationEntry.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getActivationEntries } from '../src/parts/GetActivationEntries/GetActivationEntries.ts'

test('returns empty array when activation is empty', () => {
  const activation: readonly any[] = []

  const result: readonly ActivationEntry[] = getActivationEntries(activation)

  expect(result).toEqual([])
})

test('returns valid entries for string activation events', () => {
  const activation: readonly any[] = ['onCommand:workbench.action.openFile', 'onLanguage:typescript', 'onView:explorer']

  const result: readonly ActivationEntry[] = getActivationEntries(activation)

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    isValid: true,
    stringValue: 'onCommand:workbench.action.openFile',
    errorMessage: '',
  })
  expect(result[1]).toEqual({
    isValid: true,
    stringValue: 'onLanguage:typescript',
    errorMessage: '',
  })
  expect(result[2]).toEqual({
    isValid: true,
    stringValue: 'onView:explorer',
    errorMessage: '',
  })
})

test('handles non-string activation event', () => {
  const activation: readonly any[] = ['onCommand:workbench.action.openFile', { invalid: 'object' }, 'onLanguage:typescript']

  const result: readonly ActivationEntry[] = getActivationEntries(activation)

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    isValid: true,
    stringValue: 'onCommand:workbench.action.openFile',
    errorMessage: '',
  })
  expect(result[1]).toEqual({
    isValid: false,
    stringValue: JSON.stringify({ invalid: 'object' }),
    errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
  })
  expect(result[2]).toEqual({
    isValid: true,
    stringValue: 'onLanguage:typescript',
    errorMessage: '',
  })
})

test('handles empty string activation event', () => {
  const activation: readonly any[] = ['onCommand:workbench.action.openFile', '', 'onLanguage:typescript']

  const result: readonly ActivationEntry[] = getActivationEntries(activation)

  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    isValid: true,
    stringValue: 'onCommand:workbench.action.openFile',
    errorMessage: '',
  })
  expect(result[1]).toEqual({
    isValid: false,
    stringValue: '',
    errorMessage: ExtensionDetailStrings.stringMustNotBeEmpty(),
  })
  expect(result[2]).toEqual({
    isValid: true,
    stringValue: 'onLanguage:typescript',
    errorMessage: '',
  })
})

test('handles number activation event', () => {
  const activation: readonly any[] = [123, 'onCommand:workbench.action.openFile']

  const result: readonly ActivationEntry[] = getActivationEntries(activation)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    isValid: false,
    stringValue: '123',
    errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
  })
  expect(result[1]).toEqual({
    isValid: true,
    stringValue: 'onCommand:workbench.action.openFile',
    errorMessage: '',
  })
})

test('handles boolean activation event', () => {
  const activation: readonly any[] = [true, 'onCommand:workbench.action.openFile']

  const result: readonly ActivationEntry[] = getActivationEntries(activation)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    isValid: false,
    stringValue: 'true',
    errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
  })
  expect(result[1]).toEqual({
    isValid: true,
    stringValue: 'onCommand:workbench.action.openFile',
    errorMessage: '',
  })
})

test('handles null activation event', () => {
  const activation: readonly any[] = [null, 'onCommand:workbench.action.openFile']

  const result: readonly ActivationEntry[] = getActivationEntries(activation)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    isValid: false,
    stringValue: 'null',
    errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
  })
  expect(result[1]).toEqual({
    isValid: true,
    stringValue: 'onCommand:workbench.action.openFile',
    errorMessage: '',
  })
})

test('handles array activation event', () => {
  const activation: readonly any[] = [['invalid', 'array'], 'onCommand:workbench.action.openFile']

  const result: readonly ActivationEntry[] = getActivationEntries(activation)

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    isValid: false,
    stringValue: '["invalid","array"]',
    errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
  })
  expect(result[1]).toEqual({
    isValid: true,
    stringValue: 'onCommand:workbench.action.openFile',
    errorMessage: '',
  })
})
