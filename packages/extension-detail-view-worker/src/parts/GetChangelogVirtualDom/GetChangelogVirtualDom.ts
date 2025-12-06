import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getChangelogVirtualDom = (changelogDom: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  // const notImplemented = ExtensionDetailStrings.notImplemented()
  // TODO set tabpanel role
  return [
    {
      childCount: 1,
      className: ClassNames.Changelog,
      type: VirtualDomElements.Div,
    },
    ...changelogDom,
  ]
}
