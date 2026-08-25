import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-isolated-browser'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-isolated'), 'test.security-isolated')

  const list = api.Locator('.SecurityDefinitionList')
  await api.expect(list.locator('dt.NetworkRequests + dd')).toHaveText('No')
  await api.expect(list.locator('dt.CodeExecution + dd')).toHaveText('Yes')
  await api.expect(list.locator('dt.NodeJsCodeExecution + dd')).toHaveText('No')
}
