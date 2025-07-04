import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const selectedClassName = MergeClassNames.mergeClassNames(ClassNames.ExtensionDetailTab, ClassNames.ExtensionDetailTabSelected)
const defaultClassName = ClassNames.ExtensionDetailTab

export const getTabVirtualDom = (tab: Tab): readonly VirtualDomNode[] => {
  const { label, selected, name } = tab
  const className = selected ? selectedClassName : defaultClassName
  const ariaSelected = selected ? 'true' : 'false'
  return [
    {
      type: VirtualDomElements.Button,
      role: AriaRoles.Tab,
      name,
      className,
      childCount: 1,
      tabIndex: -1,
      ariaSelected,
    },
    text(label),
  ]
}
