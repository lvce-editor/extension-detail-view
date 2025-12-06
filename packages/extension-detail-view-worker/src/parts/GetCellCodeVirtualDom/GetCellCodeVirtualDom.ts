import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCellCodeVirtualDom = (value: string, props?: { readonly className?: string; readonly title?: string }): readonly VirtualDomNode[] => {
  const tdClassName = props?.className ? `${ClassNames.TableCell} ${props.className}` : ClassNames.TableCell
  return [
    {
      childCount: 1,
      className: tdClassName,
      type: VirtualDomElements.Td,
      ...(props?.title ? { title: props.title } : {}),
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text(value),
  ]
}
