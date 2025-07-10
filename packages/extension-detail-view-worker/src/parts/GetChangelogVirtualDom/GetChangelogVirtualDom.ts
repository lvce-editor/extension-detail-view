import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

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
