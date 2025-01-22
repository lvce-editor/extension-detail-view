import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetMarkdownVirtualDom from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetVirtualDomChildCount from '../GetVirtualDomChildCount/GetVirtualDomChildCount.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getFeatureThemesVirtualDom = (themesHtml: string): readonly VirtualDomNode[] => {
  const markdownDom = GetMarkdownVirtualDom.getMarkdownVirtualDom(themesHtml)
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
      className: 'DefaultMarkdown',
      childCount,
    },
    ...markdownDom,
  ]
}
