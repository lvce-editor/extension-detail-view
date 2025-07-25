import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as LoadChangelogContent from '../LoadChangelogContent/LoadChangelogContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const selectTabChangelog = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension, baseUrl, tabs } = state
  const changelogContent = await LoadChangelogContent.loadChangelogContent(extension.path) // TODO use uri
  const changelogMarkdownHtml = await RenderMarkdown.renderMarkdown(changelogContent, {
    baseUrl,
  })
  const changelogDom = await getMarkdownVirtualDom(changelogMarkdownHtml)
  const newTabs = tabs.map((tab) => {
    return {
      ...tab,
      selected: tab.name === InputName.Changelog,
    }
  })
  return {
    ...state,
    selectedTab: InputName.Changelog,
    changelogVirtualDom: changelogDom,
    tabs: newTabs,
  }
}
