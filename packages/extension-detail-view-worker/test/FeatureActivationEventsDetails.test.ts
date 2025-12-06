import { expect, test } from '@jest/globals'
import * as FeatureActivationEventsDetails from '../src/parts/FeatureActivationEventsDetails/FeatureActivationEventsDetails.ts'

test('getActivationEventsDetails should return activation events', async () => {
  const extension = {
    activation: ['onCommand:extension.command', 'onLanguage:javascript'],
  }

  const result = await FeatureActivationEventsDetails.getActivationEventsDetails(extension)

  expect(result).toEqual({
    activationEntries: [
      {
        errorMessage: '',
        isValid: true,
        stringValue: 'onCommand:extension.command',
      },
      {
        errorMessage: '',
        isValid: true,
        stringValue: 'onLanguage:javascript',
      },
    ],
    activationEvents: ['onCommand:extension.command', 'onLanguage:javascript'],
  })
})

test('getActivationEventsDetails should handle empty activation events', async () => {
  const extension = {}

  const result = await FeatureActivationEventsDetails.getActivationEventsDetails(extension)

  expect(result).toEqual({
    activationEntries: [],
    activationEvents: [],
  })
})

test('getActivationEventsDetails should handle null activation events', async () => {
  const extension = {
    activation: null,
  }

  const result = await FeatureActivationEventsDetails.getActivationEventsDetails(extension)

  expect(result).toEqual({
    activationEntries: [],
    activationEvents: [],
  })
})
