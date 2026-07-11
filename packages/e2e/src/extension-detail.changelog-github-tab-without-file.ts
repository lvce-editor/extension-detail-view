import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [], type: 'success' })
  await api.expect(api.Locator('.ExtensionDetailTab[name="Changelog"]')).toBeVisible()
  await api.expect(api.Locator('.ExtensionDetailTab[name="Changelog"]')).toHaveAttribute('aria-selected', 'true')
}
