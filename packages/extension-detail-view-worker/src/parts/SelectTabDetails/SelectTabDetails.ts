import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as GetExtensionReadme from '../LoadReadmeContent/LoadReadmeContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const selectTabDetails = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { baseUrl, readmeUrl } = state
  const readmeContent = await GetExtensionReadme.loadReadmeContent(readmeUrl)
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
