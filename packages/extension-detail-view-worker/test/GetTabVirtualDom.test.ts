import { expect, test } from '@jest/globals'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetTabVirtualDom from '../src/parts/GetTabVirtualDom/GetTabVirtualDom.ts'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('selected tab', () => {
  const tab = {
    label: 'Details',
    name: 'Details',
    selected: true,
  }
  expect(GetTabVirtualDom.getTabVirtualDom(tab)).toEqual([
    {
      type: VirtualDomElements.Button,
      role: AriaRoles.Tab,
      name: 'Details',
      className: `${ClassNames.ExtensionDetailTab} ${ClassNames.ExtensionDetailTabSelected}`,
      childCount: 1,
      tabIndex: -1,
      ariaSelected: 'true',
    },
    text('Details'),
  ])
})

test('unselected tab', () => {
  const tab = {
    label: 'Features',
    name: 'Features',
    selected: false,
  }
  expect(GetTabVirtualDom.getTabVirtualDom(tab)).toEqual([
    {
      type: VirtualDomElements.Button,
      role: AriaRoles.Tab,
      name: 'Features',
      className: ClassNames.ExtensionDetailTab,
      childCount: 1,
      tabIndex: -1,
      ariaSelected: 'false',
    },
    text('Features'),
  ])
})

test('tab with different label and name', () => {
  const tab = {
    label: 'Display Label',
    name: 'internal-name',
    selected: false,
  }
  expect(GetTabVirtualDom.getTabVirtualDom(tab)).toEqual([
    {
      type: VirtualDomElements.Button,
      role: AriaRoles.Tab,
      name: 'internal-name',
      className: ClassNames.ExtensionDetailTab,
      childCount: 1,
      tabIndex: -1,
      ariaSelected: 'false',
    },
    text('Display Label'),
  ])
})
