import type { FeatureState } from '../FeatureState/FeatureState.ts'
import * as GetWebViews from '../GetWebViews/GetWebViews.ts'

export type FeatureWebViewsState = FeatureState<'webViews'>

export const getWebViewsDetails = async (extension: any): Promise<FeatureWebViewsState> => {
  const webViews = GetWebViews.getWebViews(extension)
  return {
    webViews,
  }
}
