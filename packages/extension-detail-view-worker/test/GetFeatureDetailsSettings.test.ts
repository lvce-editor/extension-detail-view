import { expect, test } from '@jest/globals'
import { getFeatureDetailsSettings } from '../src/parts/GetFeatureDetailsSettings/GetFeatureDetailsSettings.ts'

test('returns no setting rows when settings are missing', () => {
  expect(getFeatureDetailsSettings({})).toEqual({
    settings: [],
  })
})
