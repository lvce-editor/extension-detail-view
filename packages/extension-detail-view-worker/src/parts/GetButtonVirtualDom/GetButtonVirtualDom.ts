import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getButtonVirtualDom = (message: string, onClick: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Button,
      className: MergeClassNames.mergeClassNames(ClassNames.Button, ClassNames.ButtonPrimary),
      onClick,
      childCount: 1,
    },
    text(message),
  ]
}
