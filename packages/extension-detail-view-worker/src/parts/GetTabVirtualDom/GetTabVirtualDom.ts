import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { getTabClassName } from '../GetTabClassName/GetTabClassName.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getTabVirtualDom = (tab: Tab): readonly VirtualDomNode[] => {
  const { label, name, selected } = tab
  const className = getTabClassName(selected)
  const ariaSelected = selected

  return [
    {
      ariaSelected,
      childCount: 1,
      className,
      name,
      role: AriaRoles.Tab,
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    text(label),
  ]
}
