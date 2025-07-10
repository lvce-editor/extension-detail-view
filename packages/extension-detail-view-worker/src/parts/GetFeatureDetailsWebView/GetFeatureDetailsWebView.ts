import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetWebViews from '../GetWebViews/GetWebViews.ts'

export const getFeatureDetailsWebView = (extension: any): Partial<ExtensionDetailState> => {
  const webViews = GetWebViews.getWebViews(extension)
  return {
    webViews,
  }
}
