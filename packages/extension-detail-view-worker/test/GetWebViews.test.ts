import { expect, test } from '@jest/globals'
import type { WebView } from '../src/parts/WebView/WebView.ts'
import * as GetWebViews from '../src/parts/GetWebViews/GetWebViews.ts'

test('getWebViews - extension with webViews', () => {
  const extension = {
    webViews: [
      {
        id: 'webview1',
        selector: { type: 'div', className: 'webview' },
        contentSecurityPolicy: { 'default-src': "'self'" },
        elements: [{ type: 'button', text: 'Click me' }],
      },
      {
        id: 'webview2',
        selector: { type: 'iframe', src: 'about:blank' },
        contentSecurityPolicy: { 'script-src': "'unsafe-inline'" },
        elements: [{ type: 'input', placeholder: 'Enter text' }],
      },
    ],
  }
  const result: readonly WebView[] = GetWebViews.getWebViews(extension)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    id: 'webview1',
    selectorString: '{"type":"div","className":"webview"}',
    contentSecurityPolicyString: '{"default-src":"\'self\'"}',
    elementsString: '[\n  {\n    "type": "button",\n    "text": "Click me"\n  }\n]',
  })
  expect(result[1]).toEqual({
    id: 'webview2',
    selectorString: '{"type":"iframe","src":"about:blank"}',
    contentSecurityPolicyString: '{"script-src":"\'unsafe-inline\'"}',
    elementsString: '[\n  {\n    "type": "input",\n    "placeholder": "Enter text"\n  }\n]',
  })
})

test('getWebViews - extension without webViews', () => {
  const extension = {}
  const result: readonly WebView[] = GetWebViews.getWebViews(extension)
  expect(result).toHaveLength(0)
})

test('getWebViews - extension with null webViews', () => {
  const extension = { webViews: null }
  const result: readonly WebView[] = GetWebViews.getWebViews(extension)
  expect(result).toHaveLength(0)
})

test('getWebViews - extension with empty webViews array', () => {
  const extension = { webViews: [] }
  const result: readonly WebView[] = GetWebViews.getWebViews(extension)
  expect(result).toHaveLength(0)
})

test('getWebViews - single webView', () => {
  const extension = {
    webViews: [
      {
        id: 'single-webview',
        selector: { type: 'div' },
        contentSecurityPolicy: {},
        elements: [],
      },
    ],
  }
  const result: readonly WebView[] = GetWebViews.getWebViews(extension)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    id: 'single-webview',
    selectorString: '{"type":"div"}',
    contentSecurityPolicyString: '{}',
    elementsString: '[]',
  })
})
