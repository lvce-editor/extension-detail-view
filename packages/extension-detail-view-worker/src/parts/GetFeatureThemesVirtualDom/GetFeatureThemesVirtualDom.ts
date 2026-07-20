import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetVirtualDomChildCount from '../GetVirtualDomChildCount/GetVirtualDomChildCount.ts'

const featureContentNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.FeatureContent,
  type: VirtualDomElements.Div,
}

export const getFeatureThemesVirtualDom = (themesDom: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  const childCount = GetVirtualDomChildCount.getVirtualDomChildCount(themesDom)
  const heading = ExtensionDetailStrings.theme()
  return [
    featureContentNode,
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    {
      childCount,
      className: ClassNames.DefaultMarkdown,
      type: VirtualDomElements.Div,
    },
    ...themesDom,
  ]
}
