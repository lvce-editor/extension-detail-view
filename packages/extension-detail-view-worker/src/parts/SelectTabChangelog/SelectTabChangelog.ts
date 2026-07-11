import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getGithubReleasesMarkdown } from '../GetGithubReleasesMarkdown/GetGithubReleasesMarkdown.ts'
import { getGithubRepository } from '../GetGithubRepository/GetGithubRepository.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import { GithubReleasesError } from '../GithubReleasesError/GithubReleasesError.ts'
import * as InputName from '../InputName/InputName.ts'
import * as LoadChangelogContent from '../LoadChangelogContent/LoadChangelogContent.ts'
import { loadGithubReleases } from '../LoadGithubReleases/LoadGithubReleases.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const selectTabChangelog = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { baseUrl, extension, extensionUri, languages, locationProtocol, tabs } = state
  const githubRepository = getGithubRepository(extension)
  let changelogContent: string
  if (githubRepository) {
    try {
      const releases = await loadGithubReleases(githubRepository)
      changelogContent = getGithubReleasesMarkdown(releases, githubRepository)
    } catch (error) {
      const message = error instanceof GithubReleasesError ? error.message : 'GitHub releases could not be loaded. Please try again later.'
      changelogContent = `# Changelog\n\n${message}`
    }
  } else {
    changelogContent = await LoadChangelogContent.loadChangelogContent(extensionUri)
  }
  const changelogBaseUrl = githubRepository ? `https://github.com/${githubRepository.owner}/${githubRepository.repository}/blob/HEAD/` : baseUrl
  const changelogMarkdownHtml = await RenderMarkdown.renderMarkdown(changelogContent, {
    baseUrl: changelogBaseUrl,
    languages,
    linksExternal: true,
    locationProtocol,
  })
  const changelogDom = await getMarkdownVirtualDom(changelogMarkdownHtml, {
    scrollToTopEnabled: true,
  })
  const newTabs = tabs.map((tab) => {
    return {
      ...tab,
      selected: tab.name === InputName.Changelog,
    }
  })
  return {
    ...state,
    changelogVirtualDom: changelogDom,
    selectedTab: InputName.Changelog,
    tabs: newTabs,
  }
}
