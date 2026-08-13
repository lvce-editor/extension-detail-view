import { expect, test } from '@jest/globals'
import type { GithubRelease } from '../src/parts/GithubRelease/GithubRelease.ts'
import { getGithubReleasesMarkdown } from '../src/parts/GetGithubReleasesMarkdown/GetGithubReleasesMarkdown.ts'

const repository = { owner: 'test-owner', repository: 'test-repository' }
const release: GithubRelease = {
  assets: [],
  body: '**Important** fix',
  htmlUrl: 'https://github.com/test-owner/test-repository/releases/tag/v1.0.0',
  name: 'Version [1.0.0]',
  publishedAt: '2026-01-02T03:04:05Z',
  tagName: 'v1.0.0',
}

test('renders an empty releases message', () => {
  expect(getGithubReleasesMarkdown([], repository)).toContain('No GitHub releases were found for **test-owner/test-repository**.')
})

test('renders release metadata and body markdown', () => {
  const now = new Date('2026-01-04T03:04:05Z').getTime()
  const result = getGithubReleasesMarkdown([release], repository, now)
  expect(result).toContain('# [Version \\[1.0.0\\]](https://github.com/test-owner/test-repository/releases/tag/v1.0.0)')
  expect(result).toContain('Published 2 days ago')
  expect(result).toContain('`v1.0.0`')
  expect(result).toContain('**Important** fix')
})

test('uses the tag for an unnamed release and explains missing notes and date', () => {
  const result = getGithubReleasesMarkdown([{ ...release, body: '  ', name: '', publishedAt: '' }], repository)
  expect(result).toContain('# [v1.0.0]')
  expect(result).toContain('Publication date unavailable')
  expect(result).toContain('_No release notes were provided._')
})

test('handles an invalid publication date', () => {
  expect(getGithubReleasesMarkdown([{ ...release, publishedAt: 'invalid' }], repository)).toContain('Publication date unavailable')
})

test('separates multiple releases', () => {
  expect(getGithubReleasesMarkdown([release, release], repository)).toContain('\n\n---\n\n')
})

test('renders release assets with download metadata', () => {
  const result = getGithubReleasesMarkdown(
    [
      {
        ...release,
        assets: [
          {
            downloadCount: 1,
            downloadUrl: 'https://github.com/test-owner/test-repository/releases/download/v1.0.0/extension-v1.0.0.tar.br',
            name: 'extension-[v1.0.0].tar.br',
            size: 535_000,
          },
          {
            downloadCount: 12,
            downloadUrl: 'https://github.com/test-owner/test-repository/releases/download/v1.0.0/extension-v1.0.0.zip',
            name: 'extension-v1.0.0.zip',
            size: 1024,
          },
        ],
      },
    ],
    repository,
  )
  expect(result).toContain('## Assets (2)')
  expect(result).toContain(
    '- [extension-\\[v1.0.0\\].tar.br](https://github.com/test-owner/test-repository/releases/download/v1.0.0/extension-v1.0.0.tar.br) · 535 kB · 1 download',
  )
  expect(result).toContain(
    '- [extension-v1.0.0.zip](https://github.com/test-owner/test-repository/releases/download/v1.0.0/extension-v1.0.0.zip) · 1 kB · 12 downloads',
  )
})
