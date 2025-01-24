import { expect, test } from '@jest/globals'
<<<<<<< HEAD
=======
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
>>>>>>> origin/main
import * as GetWebViewVirtualDom from '../src/parts/GetWebViewVirtualDom/GetWebViewVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

<<<<<<< HEAD
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
=======
test('webview virtual dom', () => {
  const webView = {
    id: 'test-webview',
    selector: { viewType: 'test.view' },
    contentSecurityPolicy: { 'default-src': "'none'" },
    elements: {
      button: { tag: 'button', text: 'Click me' },
    },
>>>>>>> origin/main
  }
  expect(GetWebViewVirtualDom.getWebViewVirtualDom(webView)).toEqual([
    {
      type: VirtualDomElements.Div,
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
  ])
})
