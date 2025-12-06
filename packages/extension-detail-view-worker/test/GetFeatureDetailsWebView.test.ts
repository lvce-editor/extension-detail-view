import { expect, test } from '@jest/globals'
import * as GetFeatureDetailsWebView from '../src/parts/GetFeatureDetailsWebView/GetFeatureDetailsWebView.ts'

test('getFeatureDetailsWebView - extension with webViews', () => {
  const extension = {
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
  const result = GetFeatureDetailsWebView.getFeatureDetailsWebView(extension)
  expect(result).toEqual({
    webViews: [
      {
        contentSecurityPolicyString: '{"default-src":"\'self\'"}',
        elementsString: '[\n  {\n    "text": "Click me",\n    "type": "button"\n  }\n]',
        id: 'webview1',
        selectorString: '{"className":"webview","type":"div"}',
      },
      {
        contentSecurityPolicyString: '{"script-src":"\'unsafe-inline\'"}',
        elementsString: '[\n  {\n    "placeholder": "Enter text",\n    "type": "input"\n  }\n]',
        id: 'webview2',
        selectorString: '{"src":"about:blank","type":"iframe"}',
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
        contentSecurityPolicy: {},
        elements: [],
        id: 'single-webview',
        selector: { type: 'div' },
      },
    ],
  }
  const result = GetFeatureDetailsWebView.getFeatureDetailsWebView(extension)
  expect(result).toEqual({
    webViews: [
      {
        contentSecurityPolicyString: '{}',
        elementsString: '[]',
        id: 'single-webview',
        selectorString: '{"type":"div"}',
      },
    ],
  })
})
