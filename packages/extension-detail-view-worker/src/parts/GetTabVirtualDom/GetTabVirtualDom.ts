import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { getTabClassName } from '../GetTabClassName/GetTabClassName.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getTabVirtualDom = (tab: Tab): readonly VirtualDomNode[] => {
  const { label, selected, name } = tab
  const className = getTabClassName(selected)
  const ariaSelected = selected

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
