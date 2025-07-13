import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetMarkdownVirtualDom from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetThemeMarkdown from '../GetThemeMarkdown/GetThemeMarkdown.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export const getThemeDetails = async (extension: any, baseUrl: string): Promise<Partial<ExtensionDetailState>> => {
  const { colorThemes, iconThemes, productIconThemes } = extension
  const markdown = GetThemeMarkdown.getThemeMarkdown(colorThemes || [], iconThemes || [], productIconThemes || [])
  const rendered = await RenderMarkdown.renderMarkdown(markdown, {
    baseUrl,
  })
  const themesMarkdownDom = await GetMarkdownVirtualDom.getMarkdownVirtualDom(rendered)
  return {
    themesMarkdownDom,
  }
}