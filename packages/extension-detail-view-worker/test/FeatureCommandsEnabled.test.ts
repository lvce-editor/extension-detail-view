import { expect, test } from '@jest/globals'
import * as FeatureCommandsEnabled from '../src/parts/FeatureCommandsEnabled/FeatureCommandsEnabled.ts'

test('featureCommandsEnabled returns true when extension has commands', () => {
  const extension: unknown = { commands: [{ command: 'test.command', title: 'Test Command' }] }
  expect(FeatureCommandsEnabled.featureCommandsEnabled(extension)).toBe(true)
})

test('featureCommandsEnabled returns false when extension has no commands', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(FeatureCommandsEnabled.featureCommandsEnabled(extension)).toBe(false)
})

test('featureCommandsEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(FeatureCommandsEnabled.featureCommandsEnabled(extension)).toBe(false)
})

test('featureCommandsEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(FeatureCommandsEnabled.featureCommandsEnabled(extension)).toBe(false)
})

test('featureCommandsEnabled returns true when commands is empty array', () => {
  const extension: unknown = { commands: [] }
  expect(FeatureCommandsEnabled.featureCommandsEnabled(extension)).toBe(true)
})
