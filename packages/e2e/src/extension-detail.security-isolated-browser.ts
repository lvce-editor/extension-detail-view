import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.ts'

export const name = 'extension-detail.security-isolated-browser'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-isolated'), 'test.security-isolated')

  const table = api.Locator('.SecurityTable')
  await api.expect(table.locator('tr.SecurityRow.ExecutionIsolation')).toContainText('Isolated worker')
  await api.expect(table.locator('tr.SecurityRow.ExternalConnections')).toContainText('None declared')
  await api.expect(table.locator('tr.SecurityRow.DynamicCodeEvaluation')).toContainText('Blocked')
}
