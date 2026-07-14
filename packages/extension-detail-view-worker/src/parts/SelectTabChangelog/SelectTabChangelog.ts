import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { getGithubReleasesMarkdown } from '../GetGithubReleasesMarkdown/GetGithubReleasesMarkdown.ts'
import { getGithubRepository } from '../GetGithubRepository/GetGithubRepository.ts'
import { addScrollToTopVirtualDom, getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import { GithubReleasesError } from '../GithubReleasesError/GithubReleasesError.ts'
import * as InputName from '../InputName/InputName.ts'
import * as LoadChangelogContent from '../LoadChangelogContent/LoadChangelogContent.ts'
import { loadGithubReleases } from '../LoadGithubReleases/LoadGithubReleases.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

const releaseBatchSize = 100

const mergeMarkdownVirtualDoms = (chunks: readonly (readonly VirtualDomNode[])[]): readonly VirtualDomNode[] => {
  let root: VirtualDomNode | undefined
  const children: VirtualDomNode[] = []
  for (const chunk of chunks) {
    const [chunkRoot, ...chunkChildren] = chunk
    if (!chunkRoot) {
      continue
    }
    root = root ? { ...root, childCount: root.childCount + chunkRoot.childCount } : chunkRoot
    children.push(...chunkChildren)
  }
  return root ? [root, ...children] : []
}

const renderGithubReleases = async (
  result: Awaited<ReturnType<typeof loadGithubReleases>>,
  githubRepository: NonNullable<ReturnType<typeof getGithubRepository>>,
  languages: ExtensionDetailState['languages'],
  locationProtocol: string,
): Promise<readonly VirtualDomNode[]> => {
  const chunks: VirtualDomNode[][] = []
  const { isTruncated, releases } = result
  const releaseGroups =
    releases.length === 0
      ? [[]]
      : Array.from({ length: Math.ceil(releases.length / releaseBatchSize) }, (_, index) => {
          return releases.slice(index * releaseBatchSize, (index + 1) * releaseBatchSize)
        })
  const baseUrl = `https://github.com/${githubRepository.owner}/${githubRepository.repository}/blob/HEAD/`
  for (const [index, releaseGroup] of releaseGroups.entries()) {
    const limitMessage =
      index === 0 && isTruncated
        ? `> Showing the newest ${releases.length} GitHub releases. Older releases are not displayed to keep the editor responsive.\n\n`
        : ''
    const markdown = limitMessage + getGithubReleasesMarkdown(releaseGroup, githubRepository)
    const html = await RenderMarkdown.renderMarkdown(markdown, { baseUrl, languages, linksExternal: true, locationProtocol })
    chunks.push([...(await getMarkdownVirtualDom(html))])
  }
  return addScrollToTopVirtualDom(mergeMarkdownVirtualDoms(chunks))
}

export const selectTabChangelog = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { baseUrl, extension, extensionUri, languages, locationProtocol, tabs } = state
  const githubRepository = getGithubRepository(extension)
  let changelogDom: readonly VirtualDomNode[]
  if (githubRepository) {
    try {
      const result = await loadGithubReleases(githubRepository)
      changelogDom = await renderGithubReleases(result, githubRepository, languages, locationProtocol)
    } catch (error) {
      const message = error instanceof GithubReleasesError ? error.message : 'GitHub releases could not be loaded. Please try again later.'
      const html = await RenderMarkdown.renderMarkdown(`# Changelog\n\n${message}`, { baseUrl, languages, linksExternal: true, locationProtocol })
      changelogDom = await getMarkdownVirtualDom(html, { scrollToTopEnabled: true })
    }
  } else {
    const changelogContent = await LoadChangelogContent.loadChangelogContent(extensionUri)
    const html = await RenderMarkdown.renderMarkdown(changelogContent, { baseUrl, languages, linksExternal: true, locationProtocol })
    changelogDom = await getMarkdownVirtualDom(html, { scrollToTopEnabled: true })
  }
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
