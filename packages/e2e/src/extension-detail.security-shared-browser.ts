import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-shared-browser'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-shared'), 'test.security-shared')

  const table = api.Locator('.SecurityTable')
  await api.expect(table.locator('tr.SecurityRow.BrowserCode')).toContainText('Yes')
  await api.expect(table.locator('tr.SecurityRow.ExecutionIsolation')).toContainText('Shared extension host')
  await api.expect(table.locator('tr.SecurityRow.ExternalConnections')).toContainText('Unrestricted')
  await api.expect(table.locator('tr.SecurityRow.AutomaticActivation')).toContainText('No')
}
