import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'
import * as GetExtensionDetailVirtualDom from '../GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'

export const getExtensionDetailVirtualDom2 = async (uid: number): Promise<readonly VirtualDomNode[]> => {
  const { newState } = ExtensionDetailStates.get(uid)
  return await GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(newState, newState.sanitizedReadmeHtml, newState.selectedTab)
}
