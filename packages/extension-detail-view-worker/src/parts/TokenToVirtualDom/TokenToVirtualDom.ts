import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { JsonToken } from '../JsonToken/JsonToken.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetTokenClassName from '../GetTokenClassName/GetTokenClassName.ts'

export const tokenToVirtualDom = (token: JsonToken): VirtualDomNode => {
  return {
    type: VirtualDomElements.Span,
    className: GetTokenClassName.getTokenClassName(token),
    childCount: 1,
  }
}
