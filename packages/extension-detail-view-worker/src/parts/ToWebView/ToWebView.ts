import type { WebView } from '../WebView/WebView.ts'

export const toWebView = (rawWebView: any): WebView => {
  const { contentSecurityPolicy, elements, id, selector } = rawWebView
  return {
    contentSecurityPolicyString: JSON.stringify(contentSecurityPolicy),
    elementsString: JSON.stringify(elements, null, 2),
    id,
    selectorString: JSON.stringify(selector),
  }
}
