import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { WebView } from '../WebView/WebView.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const heading: VirtualDomNode = {
  type: VirtualDomElements.H2,
  className: ClassNames.DefinitionListItemHeading,
  childCount: 1,
}

const pre: VirtualDomNode = {
  type: VirtualDomElements.Pre,
  className: ClassNames.DefinitionListItemValue,
  childCount: 1,
}

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
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureWebView,
      childCount: 4,
    },
    item,
    heading,
    text(textId),
    pre,
    text(id),
    item,
    heading,
    text(textSelector),
    pre,
    text(selectorString),
    item,
    heading,
    text(textContentSecurityPolicy),
    pre,
    text(contentSecurityPolicyString),
    item,
    heading,
    text(textElements),
    pre,
    text(elementsString),
  ]
}
