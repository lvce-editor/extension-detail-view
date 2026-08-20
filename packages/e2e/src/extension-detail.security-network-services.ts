import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.ts'

export const name = 'extension-detail.security-network-services'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-network'), 'test.security-network')

  const row = api.Locator('.SecurityTable tr.SecurityRow.ExternalConnections')
  await api.expect(row).toContainText('Restricted')
  await api.expect(row).toContainText('https://api.example.com')
  await api.expect(row).toContainText('wss://socket.example.com')
}
