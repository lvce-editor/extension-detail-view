import { AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const extensionDetailErrorNode: VirtualDomNode = {
  childCount: 1,
  className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail, ClassNames.ExtensionDetailError),
  type: VirtualDomElements.Div,
}

const extensionDetailErrorCardNode: VirtualDomNode = {
  childCount: 3,
  className: ClassNames.ExtensionDetailErrorCard,
  role: AriaRoles.Alert,
  type: VirtualDomElements.Div,
}

const extensionDetailErrorIconNode: VirtualDomNode = {
  childCount: 0,
  className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconWarning, ClassNames.ExtensionDetailErrorIcon),
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
    extensionDetailErrorNode,
    extensionDetailErrorCardNode,
    extensionDetailErrorIconNode,
    extensionDetailErrorTitleNode,
    text(title),
    extensionDetailErrorMessageNode,
    text(message),
  ]
}
