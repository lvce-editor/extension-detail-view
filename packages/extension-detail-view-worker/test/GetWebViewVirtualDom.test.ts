import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { WebView } from '../src/parts/WebView/WebView.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetWebViewVirtualDom from '../src/parts/GetWebViewVirtualDom/GetWebViewVirtualDom.ts'
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

  const result = GetWebViewVirtualDom.getWebViewVirtualDom(webView)

  // Test the structure without checking every token
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.FeatureWebView,
    childCount: 5,
  })

  // Test that JSON strings are tokenized (not plain text)
  // First pre is for ID (plain text), second is for Selector (JSON), third is for CSP (JSON), fourth is for Elements (JSON)
  const selectorPreIndex = 9 // Second pre element
  const cspPreIndex = 23 // Third pre element
  const elementsPreIndex = 37 // Fourth pre element

  expect(result[selectorPreIndex]).toEqual({
    type: VirtualDomElements.Pre,
    className: ClassNames.DefinitionListItemValue,
    childCount: 10, // Should have multiple tokens
  })

  expect(result[cspPreIndex]).toEqual({
    type: VirtualDomElements.Pre,
    className: ClassNames.DefinitionListItemValue,
    childCount: 10, // Should have multiple tokens
  })

  expect(result[elementsPreIndex]).toEqual({
    type: VirtualDomElements.Pre,
    className: ClassNames.DefinitionListItemValue,
    childCount: 26, // Should have multiple tokens for complex JSON
  })

  // Test that tokens are present
  const hasTokenSpans = result.some(
    (node) =>
      node.type === VirtualDomElements.Span &&
      (node.className === ClassNames.TokenJsonString ||
        node.className === ClassNames.TokenJsonPunctuation ||
        node.className === ClassNames.TokenJsonNumber),
  )
  expect(hasTokenSpans).toBe(true)
})
