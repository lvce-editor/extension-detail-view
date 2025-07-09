import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetBaseUrl from '../GetBaseUrl/GetBaseUrl.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as GetExtensionReadme from '../LoadReadmeContent/LoadReadmeContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const selectTabDetails = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension, platform } = state
  const readmeContent = await GetExtensionReadme.loadReadmeContent(extension.path)
  const baseUrl = GetBaseUrl.getBaseUrl(extension.path, platform)
  const readmeHtml = await RenderMarkdown.renderMarkdown(readmeContent, {
    baseUrl,
  })
  const detailsDom = await getMarkdownVirtualDom(readmeHtml)
  return {
    ...state,
    selectedTab: InputName.Details,
    detailsVirtualDom: detailsDom,
  }
}
