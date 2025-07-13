import { expect, test } from '@jest/globals'
import { featureCommandsEnabled } from '../src/parts/FeatureCommandsEnabled/FeatureCommandsEnabled.ts'

test('featureCommandsEnabled returns commands when extension has commands', () => {
  const extension = { commands: [{ command: 'test.command', title: 'Test Command' }] }
  expect(featureCommandsEnabled(extension)).toEqual([{ command: 'test.command', title: 'Test Command' }])
})

test('featureCommandsEnabled returns undefined when extension has no commands', () => {
  const extension = { name: 'test-extension' }
  expect(featureCommandsEnabled(extension)).toBeUndefined()
})

test('featureCommandsEnabled returns null when extension is null', () => {
  expect(featureCommandsEnabled(null)).toBeNull()
})

test('featureCommandsEnabled returns undefined when extension is undefined', () => {
  expect(featureCommandsEnabled(undefined)).toBeUndefined()
})

test('featureCommandsEnabled returns empty array when commands is empty array', () => {
  const extension = { commands: [] }
  expect(featureCommandsEnabled(extension)).toEqual([])
})