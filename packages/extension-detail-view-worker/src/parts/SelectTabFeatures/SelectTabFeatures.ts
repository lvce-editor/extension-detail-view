import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetThemeMarkdown from '../GetThemeMarkdown/GetThemeMarkdown.ts'
import * as InputName from '../InputName/InputName.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const selectTabFeatures = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension, baseUrl } = state
  const { colorThemes, iconThemes, productIconThemes } = extension
  // TODO do this depending on featured tab content
  const markdown = GetThemeMarkdown.getThemeMarkdown(colorThemes || [], iconThemes || [], productIconThemes || [])
  const rendered = await RenderMarkdown.renderMarkdown(markdown, {
    baseUrl,
  })
  const dom = await getMarkdownVirtualDom(rendered)
  return {
    ...state,
    selectedTab: InputName.Features,
    themesMarkdownDom: dom,
  }
}
