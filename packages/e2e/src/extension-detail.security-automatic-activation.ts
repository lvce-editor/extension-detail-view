import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.ts'

export const name = 'extension-detail.security-automatic-activation'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-node'), 'test.security-node')

  const row = api.Locator('.SecurityTable tr.SecurityRow.AutomaticActivation')
  await api.expect(row).toContainText('Yes')
  await api.expect(row).toContainText('startup activation event')
}
