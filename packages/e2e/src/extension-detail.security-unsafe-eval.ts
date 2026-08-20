import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-unsafe-eval'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-network'), 'test.security-network')

  const row = api.Locator('.SecurityTable tr.SecurityRow.DynamicCodeEvaluation')
  await api.expect(row).toContainText('Allowed')
  await api.expect(row).toContainText('dynamic code evaluation')
}
