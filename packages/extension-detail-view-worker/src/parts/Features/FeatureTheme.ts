import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureThemesVirtualDom from '../GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'
import * as GetMarkdownVirtualDom from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetThemeMarkdown from '../GetThemeMarkdown/GetThemeMarkdown.ts'
import * as InputName from '../InputName/InputName.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'

const hasThemes = (extension: any): boolean => {
  return extension && (extension.colorThemes || extension.iconThemes || extension.productIconThemes)
}

const getThemeDetails = async (extension: any, baseUrl: string): Promise<Partial<ExtensionDetailState>> => {
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

const getThemeVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(state.themesMarkdownDom)
}

export const id = InputName.Theme
export const getLabel = ExtensionDetailStrings.theme
export const isEnabled = hasThemes
export const getDetails = getThemeDetails
export const getVirtualDom = getThemeVirtualDom
