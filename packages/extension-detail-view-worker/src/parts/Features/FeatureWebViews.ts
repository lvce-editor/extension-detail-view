import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureWebViewsVirtualDom from '../GetFeatureWebViewsVirtualDom/GetFeatureWebViewsVirtualDom.ts'
import * as GetWebViews from '../GetWebViews/GetWebViews.ts'
import * as InputName from '../InputName/InputName.ts'

const hasWebViews = (extension: any): boolean => {
  return extension && extension.webViews
}

const getWebViewsDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const webViews = GetWebViews.getWebViews(extension)
  return {
    webViews,
  }
}

const getWebViewsVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureWebViewsVirtualDom.getFeatureWebViewsVirtualDom(state.webViews)
}

export const id = InputName.WebViews
export const getLabel = ExtensionDetailStrings.webViews
export const isEnabled = hasWebViews
export const getDetails = getWebViewsDetails
export const getVirtualDom = getWebViewsVirtualDom
