import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../src/parts/Tab/Tab.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetTabsVirtualDom from '../src/parts/GetTabsVirtualDom/GetTabsVirtualDom.ts'

test('getTabsVirtualDom - returns correct virtual dom structure', () => {
  const tabs: readonly Tab[] = [
    {
      label: 'Tab 1',
      name: 'tab1',
      selected: true,
      enabled: true,
    },
    {
      label: 'Tab 2',
      name: 'tab2',
      selected: false,
      enabled: true,
    },
  ]

  const virtualDom = GetTabsVirtualDom.getTabsVirtualDom(tabs)

  expect(virtualDom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ExtensionDetailTabs,
    childCount: tabs.length,
    role: AriaRoles.TabList,
    onClick: DomEventListenerFunctions.HandleTabsClick,
    tabIndex: 0,
  })

  // Since the actual tab rendering is delegated to GetTabVirtualDom,
  // we don't need to test the specific tab content here
  expect(virtualDom.length).toBeGreaterThan(1)
})

test('getTabsVirtualDom - handles empty tabs array', () => {
  const tabs: readonly Tab[] = []

  const virtualDom = GetTabsVirtualDom.getTabsVirtualDom(tabs)

  expect(virtualDom[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.ExtensionDetailTabs,
    childCount: 0,
    role: AriaRoles.TabList,
    onClick: DomEventListenerFunctions.HandleTabsClick,
    tabIndex: 0,
  })

  expect(virtualDom.length).toBe(1)
})
