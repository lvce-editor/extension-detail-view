import { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'

export const getVirtualDomChildCount = (dom: readonly VirtualDomNode[]): number => {
  const max = dom.length - 1
  let stack: VirtualDomNode[] = []
  for (let i = max; i >= 0; i--) {
    const element = dom[i]
    if (element.childCount > 0) {
      stack = stack.slice(element.childCount)
    }
    stack.unshift(element)
  }
  return stack.length
}
