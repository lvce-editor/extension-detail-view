import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const addMarkdownImageErrorHandler = (node: VirtualDomNode): VirtualDomNode => {
  if (node.type !== VirtualDomElements.Img) {
    return node
  }
  const { onError, ...rest } = node
  return {
    onError: DomEventListenerFunctions.HandleMarkdownImageError,
    ...rest,
  }
}

export const addMarkdownImageErrorHandlers = (dom: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  return dom.map(addMarkdownImageErrorHandler)
}
