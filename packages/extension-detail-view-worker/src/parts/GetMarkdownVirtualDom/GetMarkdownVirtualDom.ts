import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as Assert from '../Assert/Assert.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getMarkdownVirtualDom = async (html: string): Promise<readonly VirtualDomNode[]> => {
  Assert.string(html)
  const dom = await RendererWorker.getMarkdownDom(html)
  return dom
}
