import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetTabVirtualDom from '../src/parts/GetTabVirtualDom/GetTabVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'
import { Tab } from '../src/parts/Tab/Tab.ts'

test('selected tab', () => {
  const tab: Tab = {
    label: ExtensionDetailStrings.details(),
    name: 'Details',
    selected: true,
    enabled: true,
  }
  expect(GetTabVirtualDom.getTabVirtualDom(tab)).toEqual([
    {
      type: VirtualDomElements.Button,
      role: AriaRoles.Tab,
      name: 'Details',
      className: `${ClassNames.ExtensionDetailTab} ${ClassNames.ExtensionDetailTabSelected}`,
      childCount: 1,
      tabIndex: -1,
      ariaSelected: true,
    },
    text(ExtensionDetailStrings.details()),
  ])
})

test('unselected tab', () => {
  const tab: Tab = {
    label: ExtensionDetailStrings.features(),
    name: 'Features',
    selected: false,
    enabled: true,
  }
  expect(GetTabVirtualDom.getTabVirtualDom(tab)).toEqual([
    {
      type: VirtualDomElements.Button,
      role: AriaRoles.Tab,
      name: 'Features',
      className: ClassNames.ExtensionDetailTab,
      childCount: 1,
      tabIndex: -1,
      ariaSelected: false,
    },
    text(ExtensionDetailStrings.features()),
  ])
})

test('tab with different label and name', () => {
  const tab: Tab = {
    label: 'Display Label',
    name: 'internal-name',
    selected: false,
    enabled: true,
  }
  expect(GetTabVirtualDom.getTabVirtualDom(tab)).toEqual([
    {
      type: VirtualDomElements.Button,
      role: AriaRoles.Tab,
      name: 'internal-name',
      className: ClassNames.ExtensionDetailTab,
      childCount: 1,
      tabIndex: -1,
      ariaSelected: false,
    },
    text('Display Label'),
  ])
})
