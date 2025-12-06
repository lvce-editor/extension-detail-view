import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { WebView } from '../WebView/WebView.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const heading: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.DefinitionListItemHeading,
  type: VirtualDomElements.H2,
}

const pre: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.DefinitionListItemValue,
  type: VirtualDomElements.Pre,
}

const item: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.DefinitionListItem,
  type: VirtualDomElements.Div,
}

export const getWebViewVirtualDom = (webView: WebView): readonly VirtualDomNode[] => {
  const { contentSecurityPolicyString, elementsString, id, selectorString } = webView
  const textId = ExtensionDetailStrings.id()
  const textSelector = ExtensionDetailStrings.selector()
  const textContentSecurityPolicy = ExtensionDetailStrings.contentSecurityPolicy()
  const textElements = ExtensionDetailStrings.elements()
  return [
    {
      childCount: 4,
      className: ClassNames.FeatureWebView,
      type: VirtualDomElements.Div,
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
