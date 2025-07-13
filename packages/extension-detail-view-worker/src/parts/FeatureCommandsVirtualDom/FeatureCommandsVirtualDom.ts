import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureCommandsVirtualDom from '../GetFeatureCommandsVirtualDom/GetFeatureCommandsVirtualDom.ts'

export const getCommandsVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom(state.commands)
}
