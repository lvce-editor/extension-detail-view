import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { JsonToken } from '../JsonToken/JsonToken.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetTokenClassName from '../GetTokenClassName/GetTokenClassName.ts'

export const tokenToVirtualDom = (token: JsonToken): VirtualDomNode => {
  return {
    childCount: 1,
    className: GetTokenClassName.getTokenClassName(token),
    type: VirtualDomElements.Span,
  }
}
