import type { FeatureSettingsState } from '../FeatureSettingsDetails/FeatureSettingsDetails.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureSettingsVirtualDom from '../GetFeatureSettingsVirtualDom/GetFeatureSettingsVirtualDom.ts'

export const getSettingsVirtualDom = (state: FeatureSettingsState): readonly VirtualDomNode[] => {
  return GetFeatureSettingsVirtualDom.getFeatureSettingsVirtualDom(state.settings)
}
