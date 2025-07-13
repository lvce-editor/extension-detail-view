import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureActivationEventsVirtualDom from '../GetFeatureActivationEventsVirtualDom/GetFeatureActivationEventsVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

const hasActivationEvents = (extension: any): boolean => {
  return extension && extension.activation
}

const getActivationEventsDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const activationEvents = extension.activation || []
  return {
    activationEvents,
  }
}

const getActivationEventsVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureActivationEventsVirtualDom.getFeatureActivationEventsVirtualDom(state.activationEvents)
}

export const id = InputName.ActivationEvents
export const getLabel = ExtensionDetailStrings.activationEvents
export const isEnabled = hasActivationEvents
export const getDetails = getActivationEventsDetails
export const getVirtualDom = getActivationEventsVirtualDom
