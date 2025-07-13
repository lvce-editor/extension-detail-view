import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureActivationEventsVirtualDom from '../GetFeatureActivationEventsVirtualDom/GetFeatureActivationEventsVirtualDom.ts'

export const getActivationEventsVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureActivationEventsVirtualDom.getFeatureActivationEventsVirtualDom(state.activationEvents)
}