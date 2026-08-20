import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-node'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-node'), 'test.security-node')

  const table = api.Locator('.SecurityTable')
  await api.expect(table.locator('tr.SecurityRow.NodeJsCode')).toContainText('Yes')
  await api.expect(table.locator('tr.SecurityRow.ExternalConnections')).toContainText('Unrestricted')
  await api.expect(table.locator('tr.SecurityRow.WorkspaceFiles')).toContainText('Read and write')
  await api.expect(table.locator('tr.SecurityRow.LocalProcesses')).toContainText('Allowed')
}
