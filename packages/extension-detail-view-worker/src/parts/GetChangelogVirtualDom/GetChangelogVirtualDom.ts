import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getChangelogVirtualDom = (changelogDom: readonly VirtualDomNode[]): readonly VirtualDomNode[] => {
  // const notImplemented = ExtensionDetailStrings.notImplemented()
  // TODO set tabpanel role
  return [
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.ExtensionDetailPanel, ClassNames.Changelog),
      role: AriaRoles.Panel,
      type: VirtualDomElements.Div,
    },
    ...changelogDom,
  ]
}
