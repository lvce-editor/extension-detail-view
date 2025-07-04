import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetMarkdownVirtualDom from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetVirtualDomChildCount from '../GetVirtualDomChildCount/GetVirtualDomChildCount.ts'

export const getFeatureThemesVirtualDom = async (themesHtml: string): Promise<readonly VirtualDomNode[]> => {
  const markdownDom = await GetMarkdownVirtualDom.getMarkdownVirtualDom(themesHtml)
  const childCount = GetVirtualDomChildCount.getVirtualDomChildCount(markdownDom)
  const heading = ExtensionDetailStrings.theme()
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.DefaultMarkdown,
      childCount,
    },
    ...markdownDom,
  ]
}
