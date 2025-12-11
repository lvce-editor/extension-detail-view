import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { WebView } from '../src/parts/WebView/WebView.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureWebViewsVirtualDom from '../src/parts/GetFeatureWebViewsVirtualDom/GetFeatureWebViewsVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getFeatureWebViewsVirtualDom with empty webViews array', () => {
  const webViews: readonly WebView[] = []
  const result = GetFeatureWebViewsVirtualDom.getFeatureWebViewsVirtualDom(webViews)
  const heading = ExtensionDetailStrings.webViews()
  expect(result).toEqual([
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text(heading),
    {
      childCount: 0,
      type: VirtualDomElements.Div,
    },
  ])
})

test('getFeatureWebViewsVirtualDom with single webView', () => {
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
  const webViews: readonly WebView[] = [webView]
  const result = GetFeatureWebViewsVirtualDom.getFeatureWebViewsVirtualDom(webViews)
  const heading = ExtensionDetailStrings.webViews()
  expect(result.length).toBeGreaterThan(4)
  expect(result[0]).toEqual({
    childCount: 2,
    className: ClassNames.FeatureContent,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 1,
    type: VirtualDomElements.H1,
  })
  expect(result[2]).toEqual(text(heading))
  expect(result[3]).toEqual({
    childCount: 1,
    type: VirtualDomElements.Div,
  })
})
