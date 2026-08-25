import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-panel'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-declarative'), 'test.security-declarative')

  const panel = api.Locator('.FeatureContent.Security')
  await api.expect(panel).toHaveAttribute('role', 'panel')
  await api.expect(panel.locator(':scope > h1')).toHaveText('Security')
  const definitionList = panel.locator(':scope > dl.SecurityDefinitionList')
  await api.expect(definitionList).toHaveCount(1)
  await api.expect(definitionList.locator(':scope > dt')).toHaveCount(3)
  await api.expect(definitionList.locator(':scope > dd')).toHaveCount(3)
  await api.expect(panel.locator(':scope > p')).toHaveCount(0)
  await api.expect(panel.locator(':scope > table')).toHaveCount(0)
}
