import { expect, test } from '@jest/globals'
import { featureSecurityEnabled } from '../src/parts/FeatureSecurityEnabled/FeatureSecurityEnabled.ts'

test('security is always enabled', () => {
  expect(featureSecurityEnabled()).toBe(true)
})
