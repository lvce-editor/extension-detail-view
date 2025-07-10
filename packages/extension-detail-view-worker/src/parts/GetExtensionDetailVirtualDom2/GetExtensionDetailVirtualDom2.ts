import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'
import * as GetExtensionDetailVirtualDom from '../GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'

export const getExtensionDetailVirtualDom2 = (uid: number): readonly VirtualDomNode[] => {
  const { newState } = ExtensionDetailStates.get(uid)
  return GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(newState, newState.selectedTab)
}
