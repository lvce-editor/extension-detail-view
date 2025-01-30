import type { WebView } from '../WebView/WebView.ts'
import * as ToWebView from '../ToWebView/ToWebView.ts'

export const getWebViews = (extension: any): readonly WebView[] => {
  const rawWebViews = extension.webViews || []
  return rawWebViews.map(ToWebView.toWebView)
}
