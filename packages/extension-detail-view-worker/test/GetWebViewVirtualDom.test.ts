import { expect, test } from '@jest/globals'
import * as GetWebViewVirtualDom from '../src/parts/GetWebViewVirtualDom/GetWebViewVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('web view virtual dom', () => {
  const webView = {
    id: 'builtin.video-preview',
    rpc: 'builtin.video-preview.video-preview-worker',
    selector: ['.mp4', '.mov', '.avi', '.wmv', '.avchd', '.webm', '.ogv', '.flv'],
    contentSecurityPolicy: ["default-src 'none'", "script-src 'self'", "style-src 'self'", "media-src 'self' blob:"],
    allow: ['fullscreen'],
    elements: [
      {
        type: 'title',
        value: 'Video Preview',
      },
      {
        type: 'script',
        path: 'media/index.js',
      },
      {
        type: 'css',
        path: 'media/index.css',
      },
    ],
  }
  expect(GetWebViewVirtualDom.getWebViewVirtualDom(webView)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'WebView',
      childCount: 6,
    },
    {
      type: VirtualDomElements.Div,
      className: 'WebViewId',
      childCount: 1,
    },
    text('builtin.video-preview'),
    {
      type: VirtualDomElements.Div,
      className: 'WebViewSelector',
      childCount: 1,
    },
    text('.mp4, .mov, .avi, .wmv, .avchd, .webm, .ogv, .flv'),
    {
      type: VirtualDomElements.Div,
      className: 'WebViewContentSecurityPolicy',
      childCount: 1,
    },
    text("default-src 'none', script-src 'self', style-src 'self', media-src 'self' blob:"),
    {
      type: VirtualDomElements.Div,
      className: 'WebViewAllow',
      childCount: 1,
    },
    text('fullscreen'),
    {
      type: VirtualDomElements.Div,
      className: 'WebViewElements',
      childCount: 3,
    },
    text('title: Video Preview'),
    text('script: media/index.js'),
    text('css: media/index.css'),
  ])
})

test('handles empty web view', () => {
  const webView = {
    id: '',
    selector: [],
    contentSecurityPolicy: [],
    allow: [],
    elements: [],
  }
  expect(GetWebViewVirtualDom.getWebViewVirtualDom(webView)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'WebView',
      childCount: 6,
    },
    {
      type: VirtualDomElements.Div,
      className: 'WebViewId',
      childCount: 1,
    },
    text(''),
    {
      type: VirtualDomElements.Div,
      className: 'WebViewSelector',
      childCount: 1,
    },
    text(''),
    {
      type: VirtualDomElements.Div,
      className: 'WebViewContentSecurityPolicy',
      childCount: 1,
    },
    text(''),
    {
      type: VirtualDomElements.Div,
      className: 'WebViewAllow',
      childCount: 1,
    },
    text(''),
    {
      type: VirtualDomElements.Div,
      className: 'WebViewElements',
      childCount: 0,
    },
  ])
})
