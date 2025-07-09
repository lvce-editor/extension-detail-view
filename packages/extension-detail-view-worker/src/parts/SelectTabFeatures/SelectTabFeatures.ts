import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'

export const selectTabFeatures = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension, baseUrl } = state
  const { colorThemes, iconThemes, productIconThemes } = extension
  // TODO do this depending on featured tab content
  const markdown = GetThemeMarkdown.getThemeMarkdown(colorThemes || [], iconThemes || [], productIconThemes || [])
  const rendered = await RenderMarkdown.renderMarkdown(markdown, {
    baseUrl,
  })
  return {
    ...state,
    selectedTab: InputName.Features,
  }
}
