import * as GetTabVirtualDom from '../GetTabVirtualDom/GetTabVirtualDom.ts'
import type { Tab } from '../Tab/Tab.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

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
