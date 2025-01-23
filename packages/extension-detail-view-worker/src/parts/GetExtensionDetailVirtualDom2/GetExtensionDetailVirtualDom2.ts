import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetExtensionDetailVirtualDom from '../GetExtensionDetailVirtualDom/GetExtensionDetailVirtualDom.ts'

export const getExtensionDetailVirtualDom2 = (newState: any): readonly VirtualDomNode[] => {
  return GetExtensionDetailVirtualDom.getExtensionDetailVirtualDom(newState, newState?.sanitizedReadmeHtml, newState?.selectedTab, newState)
}
