import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-tab'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-basics'), 'test.extension-basics')

  const topLevelTab = api.Locator('.ExtensionDetailTab[name="Security"]')
  await api.expect(topLevelTab).toHaveCount(0)
  const feature = api.Locator('.FeaturesList .Feature[name="Security"]')
  await api.expect(feature).toBeVisible()
  await api.expect(feature).toHaveClass('Feature FeatureSelected')
}
