import { expect, test } from '@jest/globals'
import type { WebView } from '../src/parts/WebView/WebView.ts'
import * as GetWebViews from '../src/parts/GetWebViews/GetWebViews.ts'

test('getWebViews - extension with webViews', () => {
  const extension: any = {
    webViews: [
      {
        contentSecurityPolicy: { 'default-src': "'self'" },
        elements: [{ text: 'Click me', type: 'button' }],
        id: 'webview1',
        selector: { className: 'webview', type: 'div' },
      },
      {
        contentSecurityPolicy: { 'script-src': "'unsafe-inline'" },
        elements: [{ placeholder: 'Enter text', type: 'input' }],
        id: 'webview2',
        selector: { src: 'about:blank', type: 'iframe' },
      },
    ],
  }
  const result: readonly WebView[] = GetWebViews.getWebViews(extension)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    contentSecurityPolicyString: '{"default-src":"\'self\'"}',
    elementsString: '[\n  {\n    "text": "Click me",\n    "type": "button"\n  }\n]',
    id: 'webview1',
    selectorString: '{"className":"webview","type":"div"}',
  })
  expect(result[1]).toEqual({
    contentSecurityPolicyString: '{"script-src":"\'unsafe-inline\'"}',
    elementsString: '[\n  {\n    "placeholder": "Enter text",\n    "type": "input"\n  }\n]',
    id: 'webview2',
    selectorString: '{"src":"about:blank","type":"iframe"}',
  })
})

test('getWebViews - extension without webViews', () => {
  const extension: any = {}
  const result: readonly WebView[] = GetWebViews.getWebViews(extension)
  expect(result).toHaveLength(0)
})

test('getWebViews - extension with null webViews', () => {
  const extension: any = { webViews: null }
  const result: readonly WebView[] = GetWebViews.getWebViews(extension)
  expect(result).toHaveLength(0)
})

test('getWebViews - extension with empty webViews array', () => {
  const extension: any = { webViews: [] }
  const result: readonly WebView[] = GetWebViews.getWebViews(extension)
  expect(result).toHaveLength(0)
})

test('getWebViews - single webView', () => {
  const extension: any = {
    webViews: [
      {
        contentSecurityPolicy: {},
        elements: [],
        id: 'single-webview',
        selector: { type: 'div' },
      },
    ],
  }
  const result: readonly WebView[] = GetWebViews.getWebViews(extension)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    contentSecurityPolicyString: '{}',
    elementsString: '[]',
    id: 'single-webview',
    selectorString: '{"type":"div"}',
  })
})
