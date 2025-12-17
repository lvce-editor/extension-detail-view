import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTabVirtualDom from '../GetTabVirtualDom/GetTabVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const getTabsVirtualDom = (tabs: readonly Tab[], focusedTabIndex: number): readonly VirtualDomNode[] => {
  const detailsAndFeaturesTabs = tabs.filter((tab) => tab.name === InputName.Details || tab.name === InputName.Features)
  return [
    {
      childCount: detailsAndFeaturesTabs.length,
      className: ClassNames.ExtensionDetailTabs,
      onClick: DomEventListenerFunctions.HandleTabsClick,
      role: AriaRoles.TabList,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...detailsAndFeaturesTabs.flatMap((tab, index) => GetTabVirtualDom.getTabVirtualDom(tab, index, focusedTabIndex)),
  ]
}
