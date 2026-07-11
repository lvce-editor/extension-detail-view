import type { TestApi } from '@lvce-editor/test-with-playwright'

export interface MockGithubApiOptions {
  readonly body?: unknown
  readonly headers?: Readonly<Record<string, string>>
  readonly message?: string
  readonly releaseCount?: number
  readonly status?: number
  readonly statusText?: string
  readonly type: 'generated' | 'invalid-json' | 'network-error' | 'response' | 'success'
}

export const createRelease = (overrides: Readonly<Record<string, unknown>> = {}): Readonly<Record<string, unknown>> => {
  return {
    body: 'Fixed an important bug.',
    html_url: 'https://github.com/test-owner/test-repository/releases/tag/v1.0.0',
    name: 'Version 1.0.0',
    published_at: '2026-01-02T03:04:05Z',
    tag_name: 'v1.0.0',
    ...overrides,
  }
}

export const mockGithubApi = async (Command: TestApi['Command'], options: MockGithubApiOptions): Promise<void> => {
  await Command.execute('ExtensionDetail.mockGithubApi', options)
}

export const openGithubChangelog = async (
  api: TestApi,
  options: MockGithubApiOptions,
  fixture: string = 'extension-github-releases',
  extensionId: string = 'test.extension-github-releases',
): Promise<void> => {
  const extensionUri = import.meta.resolve(`../../fixtures/${fixture}`)
  await api.Extension.addWebExtension(extensionUri)
  await api.ExtensionDetail.open(extensionId)
  await mockGithubApi(api.Command, options)
  await api.ExtensionDetail.selectChangelog()
}
