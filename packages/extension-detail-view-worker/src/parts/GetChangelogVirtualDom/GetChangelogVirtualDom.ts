import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getChangelogVirtualDom = (): readonly VirtualDomNode[] => {
  const notImplemented = ExtensionDetailStrings.notImplemented()
  // TODO set tabpanel role
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Changelog,
      childCount: 1,
    },
    text(notImplemented),
  ]
}
