import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-panel'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-declarative'), 'test.security-declarative')

  const panel = api.Locator('.ExtensionDetailPanel.Security')
  await api.expect(panel).toHaveAttribute('role', 'panel')
  await api.expect(panel.locator(':scope > h1')).toHaveText('Security')
  await api.expect(panel.locator(':scope > .SecurityDescription')).toContainText('Source code is not inspected')
  await api.expect(panel.locator(':scope > table.SecurityTable')).toHaveCount(1)
}
