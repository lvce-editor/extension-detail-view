import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../src/parts/Tab/Tab.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetTabVirtualDom from '../src/parts/GetTabVirtualDom/GetTabVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('selected tab', () => {
  const tab: Tab = {
    enabled: true,
    label: ExtensionDetailStrings.details(),
    name: 'Details',
    selected: true,
  }
  expect(GetTabVirtualDom.getTabVirtualDom(tab, 0, 0)).toEqual([
    {
      ariaSelected: true,
      childCount: 1,
      className: `${ClassNames.ExtensionDetailTab} ${ClassNames.ExtensionDetailTabSelected}`,
      name: 'Details',
      role: AriaRoles.Tab,
      tabIndex: 0,
      type: VirtualDomElements.Button,
    },
    text(ExtensionDetailStrings.details()),
  ])
})

test('unselected tab', () => {
  const tab: Tab = {
    enabled: true,
    label: ExtensionDetailStrings.features(),
    name: 'Features',
    selected: false,
  }
  expect(GetTabVirtualDom.getTabVirtualDom(tab, 1, 0)).toEqual([
    {
      ariaSelected: false,
      childCount: 1,
      className: ClassNames.ExtensionDetailTab,
      name: 'Features',
      role: AriaRoles.Tab,
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    text(ExtensionDetailStrings.features()),
  ])
})

test('tab with different label and name', () => {
  const tab: Tab = {
    enabled: true,
    label: 'Display Label',
    name: 'internal-name',
    selected: false,
  }
  expect(GetTabVirtualDom.getTabVirtualDom(tab, 0, 1)).toEqual([
    {
      ariaSelected: false,
      childCount: 1,
      className: ClassNames.ExtensionDetailTab,
      name: 'internal-name',
      role: AriaRoles.Tab,
      tabIndex: -1,
      type: VirtualDomElements.Button,
    },
    text('Display Label'),
  ])
})
