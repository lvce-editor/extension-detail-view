import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetMarkdownImageErrorVirtualDom from '../GetMarkdownImageErrorVirtualDom/GetMarkdownImageErrorVirtualDom.ts'

const isMatchingImageSrc = (nodeSrc: unknown, failedSrc: string): boolean => {
  if (typeof nodeSrc !== 'string' || !failedSrc) {
    return false
  }
  const normalizedNodeSrc = nodeSrc.startsWith('./') ? nodeSrc.slice(2) : nodeSrc
  return nodeSrc === failedSrc || failedSrc.endsWith(nodeSrc) || nodeSrc.endsWith(failedSrc) || failedSrc.endsWith(`/${normalizedNodeSrc}`)
}

export const replaceMarkdownImageWithError = (dom: readonly VirtualDomNode[], failedSrc: string): readonly VirtualDomNode[] => {
  let replaced = false
  const newDom: VirtualDomNode[] = []
  for (const node of dom) {
    if (node.type === VirtualDomElements.Img && isMatchingImageSrc(node.src, failedSrc)) {
      newDom.push(...GetMarkdownImageErrorVirtualDom.getMarkdownImageErrorVirtualDom())
      replaced = true
    } else {
      newDom.push(node)
    }
  }
  if (!replaced) {
    return dom
  }
  return newDom
}
