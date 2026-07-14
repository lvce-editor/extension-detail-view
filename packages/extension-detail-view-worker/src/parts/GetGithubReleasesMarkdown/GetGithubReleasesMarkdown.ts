import type { GithubRelease } from '../GithubRelease/GithubRelease.ts'
import type { GithubRepository } from '../GithubRepository/GithubRepository.ts'

const escapeMarkdown = (value: string): string => {
  return value.replaceAll('\\', '\\\\').replaceAll('[', '\\[').replaceAll(']', '\\]')
}

const getPublishedText = (publishedAt: string): string => {
  if (!publishedAt) {
    return 'Publication date unavailable'
  }
  const date = new Date(publishedAt)
  if (Number.isNaN(date.getTime())) {
    return 'Publication date unavailable'
  }
  return `Published ${date.toLocaleDateString(undefined, { dateStyle: 'long' })}`
}

export const getGithubReleasesMarkdown = (releases: readonly GithubRelease[], githubRepository: GithubRepository): string => {
  if (releases.length === 0) {
    return `# Changelog\n\nNo GitHub releases were found for **${escapeMarkdown(githubRepository.owner)}/${escapeMarkdown(githubRepository.repository)}**.`
  }
  return releases
    .map((release) => {
      const title = release.name || release.tagName
      const body = release.body.trim() || '_No release notes were provided._'
      return `# [${escapeMarkdown(title)}](${release.htmlUrl})\n\n${getPublishedText(release.publishedAt)} · \`${release.tagName}\`\n\n${body}`
    })
    .join('\n\n---\n\n')
}
