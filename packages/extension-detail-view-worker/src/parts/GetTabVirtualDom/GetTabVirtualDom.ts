import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getTabClassName } from '../GetTabClassName/GetTabClassName.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getTabVirtualDom = (tab: Tab, tabIndex: number, focusedTabIndex: number): readonly VirtualDomNode[] => {
  const { label, name, selected } = tab
  const className = getTabClassName(selected)
  const ariaSelected = selected
  const tabIndexValue = tabIndex === focusedTabIndex ? 0 : -1

  return [
    {
      ariaSelected,
      childCount: 1,
      className,
      name,
      onFocus: DomEventListenerFunctions.HandleTabFocus,
      role: AriaRoles.Tab,
      tabIndex: tabIndexValue,
      type: VirtualDomElements.Button,
    },
    text(label),
  ]
}
