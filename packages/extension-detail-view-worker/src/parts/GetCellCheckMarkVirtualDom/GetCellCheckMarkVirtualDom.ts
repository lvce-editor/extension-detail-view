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
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: 1,
    },
    text(checkedText),
  ]
}
