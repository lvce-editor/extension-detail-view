import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureJsonValidationVirtualDom from '../GetFeatureJsonValidationVirtualDom/GetFeatureJsonValidationVirtualDom.ts'

export const getJsonValidationVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureJsonValidationVirtualDom.getFeatureJsonValidationVirtualDom(state.jsonValidation)
}