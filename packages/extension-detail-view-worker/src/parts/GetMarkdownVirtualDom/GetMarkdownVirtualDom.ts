import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AddMarkdownImageErrorHandlers from '../AddMarkdownImageErrorHandlers/AddMarkdownImageErrorHandlers.ts'
import * as Assert from '../Assert/Assert.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getScrollToTopVirtualDom } from '../GetScrollToTopVirtualDom/GetScrollToTopVirtualDom.ts'
import * as MarkdownWorker from '../MarkdownWorker/MarkdownWorker.ts'

interface MarkdownOptions {
  readonly readmeContextMenuEnabled?: boolean
  readonly scrollToTopEnabled?: boolean
}

const addReadmeContextMenu = (dom: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  const [firstNode, ...rest] = dom
  if (!firstNode) {
    return dom
  }
  return [
    {
      ...firstNode,
      onContextMenu: DomEventListenerFunctions.HandleReadmeContextMenu,
    },
    ...rest,
  ]
}

export const addScrollToTopVirtualDom = (dom: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  const [firstNode, ...rest] = dom
  const extraDom = getScrollToTopVirtualDom(true)
  return [
    {
      ...firstNode,
      childCount: firstNode.childCount + 1,
      onClick: DomEventListenerFunctions.HandleReadmeClick,
      onScroll: DomEventListenerFunctions.HandleReadmeScroll,
      onSelectionChange: DomEventListenerFunctions.HandleSelectionChange,
    },
    ...extraDom,
    ...rest,
  ]
}

export const getMarkdownVirtualDom = async (html: string, options?: MarkdownOptions): Promise<readonly VirtualDomNode[]> => {
  Assert.string(html)
  let dom = AddMarkdownImageErrorHandlers.addMarkdownImageErrorHandlers(await MarkdownWorker.getVirtualDom(html))
  if (options?.scrollToTopEnabled) {
    dom = addScrollToTopVirtualDom(dom)
  }
  if (options?.readmeContextMenuEnabled) {
    dom = addReadmeContextMenu(dom)
  }
  return dom
}
