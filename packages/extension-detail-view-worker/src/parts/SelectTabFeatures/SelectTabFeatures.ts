import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetThemeMarkdown from '../GetThemeMarkdown/GetThemeMarkdown.ts'
import * as InputName from '../InputName/InputName.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const selectTabFeatures = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension, baseUrl, selectedFeature } = state

  // Only generate theme markdown when the selected feature is actually "Theme"
  let themesMarkdownDom: readonly VirtualDomNode[] = []
  if (!selectedFeature || selectedFeature === InputName.Theme) {
    const { colorThemes, iconThemes, productIconThemes } = extension
    const markdown = GetThemeMarkdown.getThemeMarkdown(colorThemes || [], iconThemes || [], productIconThemes || [])
    const rendered = await RenderMarkdown.renderMarkdown(markdown, {
      baseUrl,
    })
    themesMarkdownDom = await getMarkdownVirtualDom(rendered)
  }

  return {
    ...state,
    selectedTab: InputName.Features,
    themesMarkdownDom: themesMarkdownDom,
  }
}
