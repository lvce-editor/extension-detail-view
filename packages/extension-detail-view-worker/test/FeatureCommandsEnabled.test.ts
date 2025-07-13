import { expect, test } from '@jest/globals'
import { featureCommandsEnabled } from '../src/parts/FeatureCommandsEnabled/FeatureCommandsEnabled.ts'

test('featureCommandsEnabled returns true when extension has commands', () => {
  const extension: unknown = { commands: [{ command: 'test.command', title: 'Test Command' }] }
  expect(featureCommandsEnabled(extension)).toBe(true)
})

test('featureCommandsEnabled returns false when extension has no commands', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(featureCommandsEnabled(extension)).toBe(false)
})

test('featureCommandsEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(featureCommandsEnabled(extension)).toBe(false)
})

test('featureCommandsEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(featureCommandsEnabled(extension)).toBe(false)
})

test('featureCommandsEnabled returns false when commands is empty array', () => {
  const extension: unknown = { commands: [] }
  expect(featureCommandsEnabled(extension)).toBe(false)
})
