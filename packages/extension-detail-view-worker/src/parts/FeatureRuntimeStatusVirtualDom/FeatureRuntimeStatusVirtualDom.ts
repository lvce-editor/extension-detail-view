import { text } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getRuntimeStatusVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return [text('runtime status')]
}
