import type { GithubRelease } from '../GithubRelease/GithubRelease.ts'
import type { GithubRepository } from '../GithubRepository/GithubRepository.ts'
import * as FormatCreated from '../FormatCreated/FormatCreated.ts'

const escapeMarkdown = (value: string): string => {
  return value.replaceAll('\\', '\\\\').replaceAll('[', '\\[').replaceAll(']', '\\]')
}

const getPublishedText = (publishedAt: string, now: number): string => {
  if (!publishedAt) {
    return 'Publication date unavailable'
  }
  const date = new Date(publishedAt)
  if (Number.isNaN(date.getTime())) {
    return 'Publication date unavailable'
  }
  return `Published ${FormatCreated.formatCreated(date.getTime(), now)}`
}

export const getGithubReleasesMarkdown = (
  releases: readonly GithubRelease[],
  githubRepository: GithubRepository,
  now: number = Date.now(),
): string => {
  if (releases.length === 0) {
    return `# Changelog\n\nNo GitHub releases were found for **${escapeMarkdown(githubRepository.owner)}/${escapeMarkdown(githubRepository.repository)}**.`
  }
  return releases
    .map((release) => {
      const title = release.name || release.tagName
      const body = release.body.trim() || '_No release notes were provided._'
      return `# [${escapeMarkdown(title)}](${release.htmlUrl})\n\n${getPublishedText(release.publishedAt, now)} · \`${release.tagName}\`\n\n${body}`
    })
    .join('\n\n---\n\n')
}
