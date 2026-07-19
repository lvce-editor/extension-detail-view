import type { FeatureJsonValidationState } from '../FeatureJsonValidationDetails/FeatureJsonValidationDetails.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureJsonValidationVirtualDom from '../GetFeatureJsonValidationVirtualDom/GetFeatureJsonValidationVirtualDom.ts'

export const getJsonValidationVirtualDom = (state: FeatureJsonValidationState): readonly VirtualDomNode[] => {
  const { jsonValidation } = state
  return GetFeatureJsonValidationVirtualDom.getFeatureJsonValidationVirtualDom(jsonValidation)
}
