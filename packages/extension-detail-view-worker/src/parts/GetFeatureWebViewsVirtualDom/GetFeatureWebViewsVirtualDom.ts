import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
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
  childCount: 1,
}

const getWebViewVirtualDom = (webView: any): readonly VirtualDomNode[] => {
  const { id, selector, contentSecurityPolicy, elements } = webView
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
    text('ID'),
    pre,
    text(id),
    {
      type: VirtualDomElements.Div,
      className: 'DefinitionListItem',
      childCount: 2,
    },
    heading,
    text('Selector'),
    pre,
    text(JSON.stringify(selector)),
    {
      type: VirtualDomElements.Div,
      className: 'DefinitionListItem',
      childCount: 1,
    },
    heading,
    text('Content Security Policy'),
    pre,
    text(JSON.stringify(contentSecurityPolicy)),
    {
      type: VirtualDomElements.Div,
      className: 'DefinitionListItem',
      childCount: 1,
    },
    heading,
    text('Elements'),
    pre,
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
