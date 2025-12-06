import { test, expect } from '@jest/globals'
import * as FeatureSettingsDetails from '../src/parts/FeatureSettingsDetails/FeatureSettingsDetails.ts'

test('getSettingsDetails should return settings details', async () => {
  const extension = {
    settings: [
      { default: 'default value', name: 'setting1', type: 'string' },
      { default: true, name: 'setting2', type: 'boolean' },
    ],
  }

  const result = await FeatureSettingsDetails.getSettingsDetails(extension)

  expect(result).toHaveProperty('settings')
  expect(Array.isArray(result.settings)).toBe(true)
  expect(result.settings).toHaveLength(2)
})

test('getSettingsDetails should handle empty settings', async () => {
  const extension = {}

  const result = await FeatureSettingsDetails.getSettingsDetails(extension)

  expect(result).toEqual({
    settings: [],
  })
})
