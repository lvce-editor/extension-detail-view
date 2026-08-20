import type { Test } from '@lvce-editor/test-with-playwright'
import { openSecurity } from './_SecurityTest.js'

export const name = 'extension-detail.security-tab'

export const test: Test = async (api) => {
  await openSecurity(api, import.meta.resolve('../fixtures/extension-basics'), 'test.extension-basics')

  const tab = api.Locator('.ExtensionDetailTab[name="Security"]')
  await api.expect(tab).toBeVisible()
  await api.expect(tab).toHaveAttribute('aria-selected', 'true')
}
