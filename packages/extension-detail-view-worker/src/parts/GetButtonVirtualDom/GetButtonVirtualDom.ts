import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const className = MergeClassNames.mergeClassNames(ClassNames.Button, ClassNames.ButtonPrimary)

export const getButtonVirtualDom = (
  message: string,
  onClick: string | number,
  name: string,
  onMouseEnter?: string | number,
  onMouseLeave?: string | number,
): readonly VirtualDomNode[] => {
  const button: VirtualDomNode = {
    childCount: 1,
    className,
    name,
    onClick,
    ...(onMouseEnter ? { onMouseEnter } : {}),
    ...(onMouseLeave ? { onMouseLeave } : {}),
    type: VirtualDomElements.Button,
  }
  return [button, text(message)]
}
