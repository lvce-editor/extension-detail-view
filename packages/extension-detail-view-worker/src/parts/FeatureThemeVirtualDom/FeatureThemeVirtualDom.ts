import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureThemesVirtualDom from '../GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'

export const getThemeVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(state.themesMarkdownDom)
}
