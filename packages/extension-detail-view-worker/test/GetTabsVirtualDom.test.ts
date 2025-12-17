import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../src/parts/Tab/Tab.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTabsVirtualDom from '../src/parts/GetTabsVirtualDom/GetTabsVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('getTabsVirtualDom - returns correct virtual dom structure', () => {
  const tabs: readonly Tab[] = [
    {
      enabled: true,
      label: 'Details',
      name: InputName.Details,
      selected: true,
    },
    {
      enabled: true,
      label: 'Features',
      name: InputName.Features,
      selected: false,
    },
  ]

  const virtualDom = GetTabsVirtualDom.getTabsVirtualDom(tabs, 0)

  const detailsAndFeaturesTabs = tabs.filter((tab) => tab.name === InputName.Details || tab.name === InputName.Features)
  expect(virtualDom[0]).toEqual({
    childCount: detailsAndFeaturesTabs.length,
    className: ClassNames.ExtensionDetailTabs,
    onClick: DomEventListenerFunctions.HandleTabsClick,
    role: AriaRoles.TabList,
    type: VirtualDomElements.Div,
  })

  // Since the actual tab rendering is delegated to GetTabVirtualDom,
  // we don't need to test the specific tab content here
  expect(virtualDom.length).toBeGreaterThan(1)
})

test('getTabsVirtualDom - handles empty tabs array', () => {
  const tabs: readonly Tab[] = []

  const virtualDom = GetTabsVirtualDom.getTabsVirtualDom(tabs, 0)

  expect(virtualDom[0]).toEqual({
    childCount: 0,
    className: ClassNames.ExtensionDetailTabs,
    onClick: DomEventListenerFunctions.HandleTabsClick,
    role: AriaRoles.TabList,
    type: VirtualDomElements.Div,
  })

  expect(virtualDom.length).toBe(1)
})
