import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-declarative'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-declarative'), 'test.security-declarative')

  const table = api.Locator('.SecurityTable')
  await api.expect(table.locator('tr.SecurityRow.NodeJsCode')).toContainText('No')
  await api.expect(table.locator('tr.SecurityRow.BrowserCode')).toContainText('No')
  await api.expect(table.locator('tr.SecurityRow.ExternalConnections')).toContainText('None declared')
  await api.expect(table.locator('tr.SecurityRow.WorkspaceFiles')).toContainText('Not available')
}
