// @ts-check

/**
 * @typedef {import('@lvce-editor/test-with-playwright').TestApi} TestApi
 * @typedef {{
 *   body?: unknown,
 *   headers?: Readonly<Record<string, string>>,
 *   message?: string,
 *   releaseCount?: number,
 *   status?: number,
 *   statusText?: string,
 *   type: 'generated' | 'invalid-json' | 'network-error' | 'response' | 'success',
 * }} MockGithubApiOptions
 */

/**
 * @param {Readonly<Record<string, unknown>>} [overrides]
 * @returns {Readonly<Record<string, unknown>>}
 */
export const createRelease = (overrides = {}) => {
  return {
    body: 'Fixed an important bug.',
    html_url: 'https://github.com/test-owner/test-repository/releases/tag/v1.0.0',
    name: 'Version 1.0.0',
    published_at: '2026-01-02T03:04:05Z',
    tag_name: 'v1.0.0',
    ...overrides,
  }
}

/**
 * @param {TestApi['Command']} Command
 * @param {MockGithubApiOptions} options
 */
export const mockGithubApi = async (Command, options) => {
  await Command.execute('ExtensionDetail.mockGithubApi', options)
}

/**
 * @param {TestApi} api
 * @param {MockGithubApiOptions} options
 * @param {string} [fixture]
 * @param {string} [extensionId]
 */
export const openGithubChangelog = async (api, options, fixture = 'extension-github-releases', extensionId = 'test.extension-github-releases') => {
  const extensionUri = import.meta.resolve(`../fixtures/${fixture}`)
  await api.Extension.addWebExtension(extensionUri)
  await api.ExtensionDetail.open(extensionId)
  await mockGithubApi(api.Command, options)
  await api.ExtensionDetail.selectChangelog()
}
