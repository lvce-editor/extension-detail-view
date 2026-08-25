import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-declarative'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-declarative'), 'test.security-declarative')

  const list = api.Locator('.SecurityDefinitionList')
  await api.expect(list.locator('dt.NetworkRequests + dd')).toHaveText('No')
  await api.expect(list.locator('dt.CodeExecution + dd')).toHaveText('No')
  await api.expect(list.locator('dt.NodeJsCodeExecution + dd')).toHaveText('No')
}
