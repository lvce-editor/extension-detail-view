import { expect, test } from '@jest/globals'
import { featureCommandsEnabled } from '../src/parts/FeatureCommandsEnabled/FeatureCommandsEnabled.ts'

test('featureCommandsEnabled returns true when extension has commands', () => {
  const extension = { commands: [{ command: 'test.command', title: 'Test Command' }] }
  expect(featureCommandsEnabled(extension)).toBe(true)
})

test('featureCommandsEnabled returns false when extension has no commands', () => {
  const extension = { name: 'test-extension' }
  expect(featureCommandsEnabled(extension)).toBe(false)
})

test('featureCommandsEnabled returns false when extension is null', () => {
  expect(featureCommandsEnabled(null)).toBe(false)
})

test('featureCommandsEnabled returns false when extension is undefined', () => {
  expect(featureCommandsEnabled(undefined)).toBe(false)
})

test('featureCommandsEnabled returns false when commands is empty array', () => {
  const extension = { commands: [] }
  expect(featureCommandsEnabled(extension)).toBe(false)
})
