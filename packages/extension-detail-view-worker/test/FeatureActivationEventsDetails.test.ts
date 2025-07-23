import { test, expect } from '@jest/globals'
import * as FeatureActivationEventsDetails from '../src/parts/FeatureActivationEventsDetails/FeatureActivationEventsDetails.ts'

test('getActivationEventsDetails should return activation events', async () => {
  const extension = {
    activation: ['onCommand:extension.command', 'onLanguage:javascript'],
  }

  const result = await FeatureActivationEventsDetails.getActivationEventsDetails(extension)

  expect(result).toEqual({
    activationEvents: ['onCommand:extension.command', 'onLanguage:javascript'],
  })
})

test('getActivationEventsDetails should handle empty activation events', async () => {
  const extension = {}

  const result = await FeatureActivationEventsDetails.getActivationEventsDetails(extension)

  expect(result).toEqual({
    activationEvents: [],
  })
})

test('getActivationEventsDetails should handle null activation events', async () => {
  const extension = {
    activation: null,
  }

  const result = await FeatureActivationEventsDetails.getActivationEventsDetails(extension)

  expect(result).toEqual({
    activationEvents: [],
  })
})
