import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { FeatureDetailsHandler } from '../FeatureDetailsHandler/FeatureDetailsHandler.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetThemeMarkdown from '../GetThemeMarkdown/GetThemeMarkdown.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

const getFeatureDetailsTheme = async (extension: any, baseUrl: string): Promise<Partial<ExtensionDetailState>> => {
  // Only generate theme markdown when the selected feature is actually "Theme"
  let themesMarkdownDom: readonly VirtualDomNode[] = []
  const { colorThemes, iconThemes, productIconThemes } = extension
  const markdown = GetThemeMarkdown.getThemeMarkdown(colorThemes || [], iconThemes || [], productIconThemes || [])
  const rendered = await RenderMarkdown.renderMarkdown(markdown, {
    baseUrl,
  })
  themesMarkdownDom = await getMarkdownVirtualDom(rendered)
  return {
    themesMarkdownDom,
  }
}

export const getFeatureDetailsHandler = (featureName: string): FeatureDetailsHandler => {
  switch (featureName) {
    default:
      return getFeatureDetailsTheme
  }
}
