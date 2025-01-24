import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
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

// TODO move json stringify to view model
export const getWebViewVirtualDom = (webView: any): readonly VirtualDomNode[] => {
  const { id, selector, contentSecurityPolicy, elements } = webView
  const textId = ExtensionDetailStrings.id()
  const textSelector = ExtensionDetailStrings.selector()
  const textContentSecurityPolicy = ExtensionDetailStrings.contentSecurityPolicy()
  const textElements = ExtensionDetailStrings.elements()
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureWebView,
      childCount: 5,
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
    text(JSON.stringify(selector)),
    item,
    heading,
    text(textContentSecurityPolicy),
    pre,
    text(JSON.stringify(contentSecurityPolicy)),
    item,
    heading,
    text(textElements),
    pre,
    text(JSON.stringify(elements, null, 2)),
  ]
}
