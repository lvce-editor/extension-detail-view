import { expect, test } from '@jest/globals'
import { getSecurityDetails } from '../src/parts/FeatureSecurityDetails/FeatureSecurityDetails.ts'

test('returns the extension', async () => {
  const extension = { browser: 'main.js' }

  expect(await getSecurityDetails(extension)).toEqual({ extension })
})
