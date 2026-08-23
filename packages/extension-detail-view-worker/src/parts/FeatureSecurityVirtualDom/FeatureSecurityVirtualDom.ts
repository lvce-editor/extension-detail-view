import type { FeatureSecurityState } from '../FeatureSecurityDetails/FeatureSecurityDetails.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetSecurityVirtualDom from '../GetSecurityVirtualDom/GetSecurityVirtualDom.ts'

export const getSecurityVirtualDom = (state: FeatureSecurityState): readonly VirtualDomNode[] => {
  const { extension } = state
  return GetSecurityVirtualDom.getSecurityVirtualDom(extension)
}
