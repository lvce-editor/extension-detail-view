import { expect, test } from '@jest/globals'
import * as GetFeatureDetailsWebView from '../src/parts/GetFeatureDetailsWebView/GetFeatureDetailsWebView.ts'

test('getFeatureDetailsWebView - extension with webViews', () => {
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
  const result = GetFeatureDetailsWebView.getFeatureDetailsWebView(extension)
  expect(result).toEqual({
    webViews: [
      {
        id: 'webview1',
        selectorString: '{"type":"div","className":"webview"}',
        contentSecurityPolicyString: '{"default-src":"\'self\'"}',
        elementsString: '[\n  {\n    "type": "button",\n    "text": "Click me"\n  }\n]',
      },
      {
        id: 'webview2',
        selectorString: '{"type":"iframe","src":"about:blank"}',
        contentSecurityPolicyString: '{"script-src":"\'unsafe-inline\'"}',
        elementsString: '[\n  {\n    "type": "input",\n    "placeholder": "Enter text"\n  }\n]',
      },
    ],
  })
})

test('getFeatureDetailsWebView - extension without webViews', () => {
  const extension = {}
  const result = GetFeatureDetailsWebView.getFeatureDetailsWebView(extension)
  expect(result).toEqual({
    webViews: [],
  })
})

test('getFeatureDetailsWebView - extension with null webViews', () => {
  const extension = { webViews: null }
  const result = GetFeatureDetailsWebView.getFeatureDetailsWebView(extension)
  expect(result).toEqual({
    webViews: [],
  })
})

test('getFeatureDetailsWebView - extension with empty webViews array', () => {
  const extension = { webViews: [] }
  const result = GetFeatureDetailsWebView.getFeatureDetailsWebView(extension)
  expect(result).toEqual({
    webViews: [],
  })
})

test('getFeatureDetailsWebView - single webView', () => {
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
  const result = GetFeatureDetailsWebView.getFeatureDetailsWebView(extension)
  expect(result).toEqual({
    webViews: [
      {
        id: 'single-webview',
        selectorString: '{"type":"div"}',
        contentSecurityPolicyString: '{}',
        elementsString: '[]',
      },
    ],
  })
})
