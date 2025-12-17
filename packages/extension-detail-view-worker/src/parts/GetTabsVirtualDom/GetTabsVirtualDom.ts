import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTabVirtualDom from '../GetTabVirtualDom/GetTabVirtualDom.ts'

export const getTabsVirtualDom = (tabs: readonly Tab[], focusedTabIndex: number): readonly VirtualDomNode[] => {
  return [
    {
      childCount: tabs.length,
      className: ClassNames.ExtensionDetailTabs,
      onClick: DomEventListenerFunctions.HandleTabsClick,
      role: AriaRoles.TabList,
      type: VirtualDomElements.Div,
    },
    ...tabs.flatMap((tab, index) => GetTabVirtualDom.getTabVirtualDom(tab, index, focusedTabIndex)),
  ]
}
