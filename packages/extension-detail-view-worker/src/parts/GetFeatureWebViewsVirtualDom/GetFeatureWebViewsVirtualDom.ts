import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getWebViewVirtualDom = (webView: any): readonly VirtualDomNode[] => {
  const { id, selector, contentSecurityPolicy, elements } = webView
  return [
    {
      type: VirtualDomElements.Div,
      className: 'FeatureWebView',
      childCount: 4,
    },
    {
      type: VirtualDomElements.Div,
      className: 'DefinitionListItem',
      childCount: 2,
    },
    text('ID'),
    text(id),
    {
      type: VirtualDomElements.Pre,
      className: 'DefinitionListItem',
      childCount: 2,
    },
    text('Selector'),
    text(JSON.stringify(selector)),
    {
      type: VirtualDomElements.Pre,
      className: 'DefinitionListItem',
      childCount: 1,
    },
    text('Content Security Policy'),
    text(JSON.stringify(contentSecurityPolicy)),
    {
      type: VirtualDomElements.Pre,
      className: 'DefinitionListItem',
      childCount: 1,
    },
    text('Elements'),
    text(JSON.stringify(elements)),
  ]
}

export const getFeatureWebViewsVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const webViews = extension.webViews || []
  const heading = ExtensionDetailStrings.webViews()
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureCommands,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(heading),
    {
      type: VirtualDomElements.Div,
      childCount: webViews.length,
    },
    ...webViews.flatMap(getWebViewVirtualDom),
  ]
}
