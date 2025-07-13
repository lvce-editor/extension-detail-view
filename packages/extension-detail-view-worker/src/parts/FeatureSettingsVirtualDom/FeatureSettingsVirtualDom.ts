import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureSettingsVirtualDom from '../GetFeatureSettingsVirtualDom/GetFeatureSettingsVirtualDom.ts'

export const getSettingsVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureSettingsVirtualDom.getFeatureSettingsVirtualDom(state.settings)
}
