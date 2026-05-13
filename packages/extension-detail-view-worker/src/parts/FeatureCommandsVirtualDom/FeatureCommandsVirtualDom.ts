import type { FeatureCommandsState } from '../FeatureCommandsDetails/FeatureCommandsDetails.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureCommandsVirtualDom from '../GetFeatureCommandsVirtualDom/GetFeatureCommandsVirtualDom.ts'

export const getCommandsVirtualDom = (state: FeatureCommandsState): readonly VirtualDomNode[] => {
  return GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom(state.commands)
}
