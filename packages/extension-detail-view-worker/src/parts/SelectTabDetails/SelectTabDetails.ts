import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetMarkdownVirtualDom from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import { getSyntaxLanguages } from '../GetSyntaxLanguages/GetSyntaxLanguages.ts'
import * as InputName from '../InputName/InputName.ts'
import * as GetExtensionReadme from '../LoadReadmeContent/LoadReadmeContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const selectTabDetails = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { assetDir, baseUrl, cacheName, extensionId, locationProtocol, platform, readmeUri, tabs } = state
  const languages = await getSyntaxLanguages(platform, assetDir)
  const readmeContent = await GetExtensionReadme.loadReadmeContent(readmeUri)
  const readmeHtml = await RenderMarkdown.renderMarkdown(
    readmeContent,
    {
      baseUrl,
      extensionId,
      languages,
      linksExternal: true,
      locationProtocol,
    },
    cacheName,
  )
  const detailsDom = await GetMarkdownVirtualDom.getMarkdownVirtualDom(readmeHtml)
  const newTabs = tabs.map((tab) => {
    return {
      ...tab,
      selected: tab.name === InputName.Details,
    }
  })
  return {
    ...state,
    detailsVirtualDom: detailsDom,
    selectedTab: InputName.Details,
    tabs: newTabs,
  }
}
