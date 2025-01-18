import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetMarkdownVirtualDom from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetVirtualDomChildCount from '../GetVirtualDomChildCount/GetVirtualDomChildCount.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureThemesVirtualDom = (themesHtml: string): readonly VirtualDomNode[] => {
  const markdownDom = GetMarkdownVirtualDom.getMarkdownVirtualDom(themesHtml)
  const childCount = GetVirtualDomChildCount.getVirtualDomChildCount(markdownDom)
  const heading = 'Themes'
  return [
    {
      type: VirtualDomElements.Div,
      className: 'FeatureTheme',
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(heading),
    {
      type: VirtualDomElements.Div,
      className: 'DefaultMarkdown',
      childCount,
    },
    ...markdownDom,
  ]
}
