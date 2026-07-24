import { expect, test } from '@jest/globals'
import type { GithubRelease } from '../src/parts/GithubRelease/GithubRelease.ts'
import { getGithubReleasesMarkdown } from '../src/parts/GetGithubReleasesMarkdown/GetGithubReleasesMarkdown.ts'

const repository = { owner: 'test-owner', repository: 'test-repository' }
const release: GithubRelease = {
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
