import { AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getExtensionDetailErrorVirtualDom = (title: string, message: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail, ClassNames.ExtensionDetailError),
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: ClassNames.ExtensionDetailErrorCard,
      role: AriaRoles.Alert,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconWarning, ClassNames.ExtensionDetailErrorIcon),
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailErrorTitle,
      type: VirtualDomElements.H1,
    },
    text(title),
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailErrorMessage,
      type: VirtualDomElements.P,
    },
    text(message),
  ]
}
