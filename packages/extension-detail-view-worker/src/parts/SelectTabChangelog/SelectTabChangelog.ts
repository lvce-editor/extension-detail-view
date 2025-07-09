import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as LoadChangelogContent from '../LoadChangelogContent/LoadChangelogContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const selectTabChangelog = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension, baseUrl } = state
  const changelogContent = await LoadChangelogContent.loadChangelogContent(extension.path) // TODO use uri
  const changelogMarkdownHtml = await RenderMarkdown.renderMarkdown(changelogContent, {
    baseUrl,
  })

  const changelogDom = await getMarkdownVirtualDom(changelogMarkdownHtml)
  return {
    ...state,
    selectedTab: InputName.Changelog,
    changelogVirtualDom: changelogDom,
  }
}
