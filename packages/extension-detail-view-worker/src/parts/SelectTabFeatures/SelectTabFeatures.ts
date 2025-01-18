import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetThemeMarkdown from '../GetThemeMarkdown/GetThemeMarkdown.ts'
import * as InputName from '../InputName/InputName.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const selectTab = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension, baseUrl } = state
  const { colorThemes, iconThemes, productIconThemes } = extension
  const markdown = GetThemeMarkdown.getThemeMarkdown(colorThemes || [], iconThemes || [], productIconThemes || [])
  const rendered = await RenderMarkdown.renderMarkdown(markdown, {
    baseUrl,
  })
  return {
    ...state,
    selectedTab: InputName.Features,
    selectedFeatureMarkdownDom: rendered,
  }
}
