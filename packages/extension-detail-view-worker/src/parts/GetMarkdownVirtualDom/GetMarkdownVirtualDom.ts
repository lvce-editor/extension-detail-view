import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as Assert from '../Assert/Assert.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const getMarkdownVirtualDom = async (html: string): Promise<readonly VirtualDomNode[]> => {
  Assert.string(html)
  // @ts-ignore todo
  const dom = await ParentRpc.invoke('Markdown.getVirtualDom', html)
  return dom
}
