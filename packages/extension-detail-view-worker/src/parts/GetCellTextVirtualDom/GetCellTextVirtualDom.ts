import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCellTextVirtualDom = (value: string, props?: { readonly className?: string; readonly title?: string }): readonly VirtualDomNode[] => {
  const tdClassName = props?.className ? `${ClassNames.TableCell} ${props.className}` : ClassNames.TableCell
  return [
    {
      type: VirtualDomElements.Td,
      className: tdClassName,
      childCount: 1,
      ...(props?.title ? { title: props.title } : {}),
    },
    text(value),
  ]
}
