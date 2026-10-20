import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-terminal'

export const test: Test = async (api) => {
  // A manifest without executable entry points still discloses the requested capability.
  await openSecurity(api, import.meta.resolve('../fixtures/extension-security-terminal'), 'test.security-terminal')
  const list = api.Locator('.SecurityDefinitionList')
  await api.expect(list.locator('dt.TerminalExecution + dd')).toHaveText('Yes')
  await api.expect(list.locator('dt.CodeExecution + dd')).toHaveText('No')
}
