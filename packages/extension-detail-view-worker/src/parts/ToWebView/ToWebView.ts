import type { WebView } from '../WebView/WebView.ts'

export const toWebView = (rawWebView: any): WebView => {
  const { id, selector, contentSecurityPolicy, elements } = rawWebView
  return {
    id,
    selectorString: JSON.stringify(selector),
    contentSecurityPolicyString: JSON.stringify(contentSecurityPolicy),
    elementsString: JSON.stringify(elements, null, 2),
  }
}
