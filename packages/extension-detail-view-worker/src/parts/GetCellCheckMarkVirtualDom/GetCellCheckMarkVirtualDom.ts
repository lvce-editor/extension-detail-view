import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getCheckedText = (checked: boolean): string => {
  if (checked) {
    return 'yes'
  }
  return 'no'
}

export const getCellCheckMarkVirtualDom = (value: string, props: { readonly checked: boolean }): readonly VirtualDomNode[] => {
  const { checked } = props
  const checkedText = getCheckedText(checked)
  return [
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    text(checkedText),
  ]
}
