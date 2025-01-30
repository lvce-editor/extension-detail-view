import { expect, test } from '@jest/globals'
import type { WebView } from '../src/parts/WebView/WebView.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetWebViewVirtualDom from '../src/parts/GetWebViewVirtualDom/GetWebViewVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('webview virtual dom', () => {
  const webView: WebView = {
    id: 'test-webview',
    selectorString: JSON.stringify({ viewType: 'test.view' }),
    contentSecurityPolicyString: JSON.stringify({ 'default-src': "'none'" }),
    elementsString: JSON.stringify(
      {
        button: { tag: 'button', text: 'Click me' },
      },
      null,
      2,
    ),
  }
  expect(GetWebViewVirtualDom.getWebViewVirtualDom(webView)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureWebView,
      childCount: 5,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.DefinitionListItem,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H2,
      className: ClassNames.DefinitionListItemHeading,
      childCount: 1,
    },
    text('ID'),
    {
      type: VirtualDomElements.Pre,
      className: ClassNames.DefinitionListItemValue,
      childCount: 1,
    },
    text('test-webview'),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.DefinitionListItem,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H2,
      className: ClassNames.DefinitionListItemHeading,
      childCount: 1,
    },
    text('Selector'),
    {
      type: VirtualDomElements.Pre,
      className: ClassNames.DefinitionListItemValue,
      childCount: 1,
    },
    text('{"viewType":"test.view"}'),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.DefinitionListItem,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H2,
      className: ClassNames.DefinitionListItemHeading,
      childCount: 1,
    },
    text('ContentSecurityPolicy'),
    {
      type: VirtualDomElements.Pre,
      className: ClassNames.DefinitionListItemValue,
      childCount: 1,
    },
    text('{"default-src":"\'none\'"}'),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.DefinitionListItem,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H2,
      className: ClassNames.DefinitionListItemHeading,
      childCount: 1,
    },
    text('Elements'),
    {
      type: VirtualDomElements.Pre,
      className: ClassNames.DefinitionListItemValue,
      childCount: 1,
    },
    text('{\n  "button": {\n    "tag": "button",\n    "text": "Click me"\n  }\n}'),
  ])
})
