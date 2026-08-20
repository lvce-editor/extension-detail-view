import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.ts'

export const name = 'extension-detail.security-embedded-content'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-webviews'), 'test.webviews-single')

  const row = api.Locator('.SecurityTable tr.SecurityRow.Webviews')
  await api.expect(row).toContainText('1')
  await api.expect(row).toContainText('embedded web content')
}
