import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTabVirtualDom from '../GetTabVirtualDom/GetTabVirtualDom.ts'

export const getTabsVirtualDom = (tabs: readonly Tab[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailTabs,
      childCount: tabs.length,
      role: AriaRoles.TabList,
      onClick: DomEventListenerFunctions.HandleTabsClick,
      tabIndex: 0,
    },
    ...tabs.flatMap(GetTabVirtualDom.getTabVirtualDom),
  ]
}
