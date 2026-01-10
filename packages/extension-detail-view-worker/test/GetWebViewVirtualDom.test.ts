import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { WebView } from '../src/parts/WebView/WebView.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetWebViewVirtualDom from '../src/parts/GetWebViewVirtualDom/GetWebViewVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('webview virtual dom', () => {
  const webView: WebView = {
    contentSecurityPolicyString: JSON.stringify({ 'default-src': "'none'" }),
    elementsString: JSON.stringify(
      {
        button: { tag: 'button', text: 'Click me' },
      },
      null,
      2,
    ),
    id: 'test-webview',
    selectorString: JSON.stringify({ viewType: 'test.view' }),
  }
  expect(GetWebViewVirtualDom.getWebViewVirtualDom(webView)).toEqual([
    {
      childCount: 4,
      className: ClassNames.FeatureWebView,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.DefinitionListItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DefinitionListItemHeading,
      type: VirtualDomElements.H2,
    },
    text('ID'),
    {
      childCount: 1,
      className: ClassNames.DefinitionListItemValue,
      type: VirtualDomElements.Pre,
    },
    text('test-webview'),
    {
      childCount: 2,
      className: ClassNames.DefinitionListItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DefinitionListItemHeading,
      type: VirtualDomElements.H2,
    },
    text('Selector'),
    {
      childCount: 1,
      className: ClassNames.DefinitionListItemValue,
      type: VirtualDomElements.Pre,
    },
    text('{"viewType":"test.view"}'),
    {
      childCount: 2,
      className: ClassNames.DefinitionListItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DefinitionListItemHeading,
      type: VirtualDomElements.H2,
    },
    text('Content Security Policy'),
    {
      childCount: 1,
      className: ClassNames.DefinitionListItemValue,
      type: VirtualDomElements.Pre,
    },
    text('{"default-src":"\'none\'"}'),
    {
      childCount: 2,
      className: ClassNames.DefinitionListItem,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.DefinitionListItemHeading,
      type: VirtualDomElements.H2,
    },
    text('Elements'),
    {
      childCount: 1,
      className: ClassNames.DefinitionListItemValue,
      type: VirtualDomElements.Pre,
    },
    text('{\n  "button": {\n    "tag": "button",\n    "text": "Click me"\n  }\n}'),
  ])
})
