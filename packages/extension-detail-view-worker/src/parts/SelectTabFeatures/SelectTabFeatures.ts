import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'

<<<<<<< HEAD
export const selectTab = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
=======
export const selectTabFeatures = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension, baseUrl } = state
  const { colorThemes, iconThemes, productIconThemes } = extension
  // TODO do this depending on featured tab content
  const markdown = GetThemeMarkdown.getThemeMarkdown(colorThemes || [], iconThemes || [], productIconThemes || [])
  const rendered = await RenderMarkdown.renderMarkdown(markdown, {
    baseUrl,
  })
>>>>>>> origin/main
  return {
    ...state,
    selectedTab: InputName.Features,
  }
}
