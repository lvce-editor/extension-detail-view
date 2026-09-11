import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-shared-browser'

export const test: Test = async (api) => {
  // act
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-shared'), 'test.security-shared')

  // assert
  const list = api.Locator('.SecurityDefinitionList')
  await api.expect(list.locator('dt.NetworkRequests + dd')).toHaveText('Yes')
  await api.expect(list.locator('dt.CodeExecution + dd')).toHaveText('Yes')
  await api.expect(list.locator('dt.NodeJsCodeExecution + dd')).toHaveText('No')
}
