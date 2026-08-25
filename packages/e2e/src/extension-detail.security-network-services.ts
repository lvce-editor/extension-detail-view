import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-network-services'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-network'), 'test.security-network')

  const list = api.Locator('.SecurityDefinitionList')
  await api.expect(list.locator('dt.NetworkRequests + dd')).toHaveText('https://api.example.com, wss://socket.example.com')
  await api.expect(list.locator('dt.CodeExecution + dd')).toHaveText('Yes')
  await api.expect(list.locator('dt.NodeJsCodeExecution + dd')).toHaveText('No')
}
