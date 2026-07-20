import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCellTextVirtualDom = (value: string, props?: { readonly className?: string; readonly title?: string }): readonly VirtualDomNode[] => {
  const tdClassName = MergeClassNames.mergeClassNames(ClassNames.TableCell, props?.className || '')
  return [
    {
      childCount: 1,
      className: tdClassName,
      type: VirtualDomElements.Td,
      ...(props?.title && { title: props.title }),
    },
    text(value),
  ]
}
