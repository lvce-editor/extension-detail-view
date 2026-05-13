import type { FeatureState } from '../FeatureState/FeatureState.ts'
import * as GetMarkdownVirtualDom from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetThemeMarkdown from '../GetThemeMarkdown/GetThemeMarkdown.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

export type FeatureThemeState = FeatureState<'themesMarkdownDom'>

export const getThemeDetails = async (extension: any, baseUrl: string, locationProtocol: string): Promise<FeatureThemeState> => {
  const { colorThemes, iconThemes, productIconThemes } = extension
  const markdown = GetThemeMarkdown.getThemeMarkdown(colorThemes || [], iconThemes || [], productIconThemes || [])
  const rendered = await RenderMarkdown.renderMarkdown(markdown, {
    baseUrl,
    locationProtocol,
  })
  const themesMarkdownDom = await GetMarkdownVirtualDom.getMarkdownVirtualDom(rendered)
  return {
    themesMarkdownDom,
  }
}
