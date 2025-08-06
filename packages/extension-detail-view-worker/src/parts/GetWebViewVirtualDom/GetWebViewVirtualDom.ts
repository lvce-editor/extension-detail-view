import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { WebView } from '../WebView/WebView.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetJsonSyntaxHighlightedVirtualDom from '../GetJsonSyntaxHighlightedVirtualDom/GetJsonSyntaxHighlightedVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const heading: VirtualDomNode = {
  type: VirtualDomElements.H2,
  className: ClassNames.DefinitionListItemHeading,
  childCount: 1,
}

const createPre = (tokenCount: number): VirtualDomNode => ({
  type: VirtualDomElements.Pre,
  className: ClassNames.DefinitionListItemValue,
  childCount: tokenCount,
})

const item: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.DefinitionListItem,
  childCount: 2,
}

export const getWebViewVirtualDom = (webView: WebView): readonly VirtualDomNode[] => {
  const { id, selectorString, contentSecurityPolicyString, elementsString } = webView
  const textId = ExtensionDetailStrings.id()
  const textSelector = ExtensionDetailStrings.selector()
  const textContentSecurityPolicy = ExtensionDetailStrings.contentSecurityPolicy()
  const textElements = ExtensionDetailStrings.elements()

  // Use syntax highlighting for JSON strings
  const selectorTokens = GetJsonSyntaxHighlightedVirtualDom.getJsonSyntaxHighlightedVirtualDom(selectorString)
  const cspTokens = GetJsonSyntaxHighlightedVirtualDom.getJsonSyntaxHighlightedVirtualDom(contentSecurityPolicyString)
  const elementsTokens = GetJsonSyntaxHighlightedVirtualDom.getJsonSyntaxHighlightedVirtualDom(elementsString)

  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureWebView,
      childCount: 5,
    },
    item,
    heading,
    text(textId),
    createPre(1),
    text(id),
    item,
    heading,
    text(textSelector),
    createPre(selectorTokens.length),
    ...selectorTokens,
    item,
    heading,
    text(textContentSecurityPolicy),
    createPre(cspTokens.length),
    ...cspTokens,
    item,
    heading,
    text(textElements),
    createPre(elementsTokens.length),
    ...elementsTokens,
  ]
}
