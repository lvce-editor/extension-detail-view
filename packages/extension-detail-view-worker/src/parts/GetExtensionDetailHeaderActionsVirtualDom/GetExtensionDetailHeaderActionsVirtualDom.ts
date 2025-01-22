import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getExtensionDetailHeaderActionsVirtualDom = (): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderActions,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Button,
      className: ClassNames.Button + ' ButtonPrimary',
      childCount: 1,
    },
    text('Disable'),
    {
      type: VirtualDomElements.Button,
      className: ClassNames.Button + ' ' + ClassNames.ButtonPrimary,
      childCount: 1,
    },
    text('Uninstall'),
  ]
  return dom
}
