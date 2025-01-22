import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const heading: VirtualDomNode = {
  type: VirtualDomElements.H2,
  className: 'DefinitionListItemHeading',
  childCount: 1,
}

const pre: VirtualDomNode = {
  type: VirtualDomElements.Pre,
  className: 'DefinitionListItemValue',
  childCount: 1,
}

export const getWebViewVirtualDom = (webView: any): readonly VirtualDomNode[] => {
  const { id, selector, contentSecurityPolicy, elements } = webView
  const textId = ExtensionDetailStrings.id()
  const textSelector = ExtensionDetailStrings.selector()
  const textContentSecurityPolicy = ExtensionDetailStrings.contentSecurityPolicy()
  const textElements = ExtensionDetailStrings.elements()
  return [
    {
      type: VirtualDomElements.Div,
      className: 'FeatureWebView',
      childCount: 5,
    },
    {
      type: VirtualDomElements.Div,
      className: 'DefinitionListItem',
      childCount: 2,
    },
    heading,
    text(textId),
    pre,
    text(id),
    {
      type: VirtualDomElements.Div,
      className: 'DefinitionListItem',
      childCount: 2,
    },
    heading,
    text(textSelector),
    pre,
    text(JSON.stringify(selector)),
    {
      type: VirtualDomElements.Div,
      className: 'DefinitionListItem',
      childCount: 1,
    },
    heading,
    text(textContentSecurityPolicy),
    pre,
    text(JSON.stringify(contentSecurityPolicy)),
    {
      type: VirtualDomElements.Div,
      className: 'DefinitionListItem',
      childCount: 1,
    },
    heading,
    text(textElements),
    pre,
    text(JSON.stringify(elements)),
  ]
}
