import { AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const extensionDetailErrorCardNode: VirtualDomNode = {
  childCount: 3,
  className: ClassNames.ExtensionDetailErrorCard,
  role: AriaRoles.Alert,
  type: VirtualDomElements.Div,
}

const extensionDetailErrorTitleNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.ExtensionDetailErrorTitle,
  type: VirtualDomElements.H1,
}

const extensionDetailErrorMessageNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.ExtensionDetailErrorMessage,
  type: VirtualDomElements.P,
}

export const getExtensionDetailErrorVirtualDom = (title: string, message: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail, ClassNames.ExtensionDetailError),
      type: VirtualDomElements.Div,
    },
    extensionDetailErrorCardNode,
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconWarning, ClassNames.ExtensionDetailErrorIcon),
      type: VirtualDomElements.Div,
    },
    extensionDetailErrorTitleNode,
    text(title),
    extensionDetailErrorMessageNode,
    text(message),
  ]
}
