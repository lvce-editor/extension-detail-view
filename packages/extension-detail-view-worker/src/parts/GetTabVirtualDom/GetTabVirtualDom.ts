import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getTabVirtualDom = (tab: Tab): readonly VirtualDomNode[] => {
  const { label, selected, name } = tab
  const className = selected
    ? MergeClassNames.mergeClassNames(ClassNames.ExtensionDetailTab, ClassNames.ExtensionDetailTabSelected)
    : ClassNames.ExtensionDetailTab
  return [
    {
      type: VirtualDomElements.Button,
      role: AriaRoles.Tab,
      name,
      className,
      childCount: 1,
      tabIndex: -1,
    },
    text(label),
  ]
}
