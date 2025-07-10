import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getChangelogVirtualDom = (changelogDom: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  // const notImplemented = ExtensionDetailStrings.notImplemented()
  // TODO set tabpanel role
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Changelog,
      childCount: 1,
    },
    ...changelogDom,
  ]
}
