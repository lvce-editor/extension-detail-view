import type { FeatureThemeState } from '../FeatureThemeDetails/FeatureThemeDetails.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureThemesVirtualDom from '../GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'

export const getThemeVirtualDom = (state: FeatureThemeState): readonly VirtualDomNode[] => {
  return GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(state.themesMarkdownDom)
}
