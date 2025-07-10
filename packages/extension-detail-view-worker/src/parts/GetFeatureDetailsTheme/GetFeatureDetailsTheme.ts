import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetThemeMarkdown from '../GetThemeMarkdown/GetThemeMarkdown.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const getFeatureDetailsTheme = async (extension: any, baseUrl: string): Promise<Partial<ExtensionDetailState>> => {
  // Only generate theme markdown when the selected feature is actually "Theme"
  const { colorThemes, iconThemes, productIconThemes } = extension
  const markdown = GetThemeMarkdown.getThemeMarkdown(colorThemes || [], iconThemes || [], productIconThemes || [])
  const rendered = await RenderMarkdown.renderMarkdown(markdown, {
    baseUrl,
  })
  const themesMarkdownDom = await getMarkdownVirtualDom(rendered)
  return {
    themesMarkdownDom,
  }
}
