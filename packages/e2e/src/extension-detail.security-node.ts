import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-node'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-node'), 'test.security-node')

  const list = api.Locator('.SecurityDefinitionList')
  await api.expect(list.locator('dt.NetworkRequests + dd')).toHaveText('Yes')
  await api.expect(list.locator('dt.CodeExecution + dd')).toHaveText('No')
  await api.expect(list.locator('dt.NodeJsCodeExecution + dd')).toHaveText('Yes')
}
