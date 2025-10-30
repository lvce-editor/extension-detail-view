import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCellLinkVirtualDom = (value: string, { href }: { readonly href: string }): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: 1,
    },
    {
      type: VirtualDomElements.A,
      className: ClassNames.Link,
      href,
      childCount: 1,
    },
    text(value),
  ]
}
