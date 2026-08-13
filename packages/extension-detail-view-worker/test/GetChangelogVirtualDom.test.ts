import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetChangelogVirtualDom from '../src/parts/GetChangelogVirtualDom/GetChangelogVirtualDom.ts'

test('changelog virtual dom', () => {
  expect(GetChangelogVirtualDom.getChangelogVirtualDom([])).toEqual([
    {
      childCount: 1,
      className: `${ClassNames.ExtensionDetailPanel} ${ClassNames.Changelog}`,
      onContextMenu: DomEventListenerFunctions.HandleChangelogContextMenu,
      role: AriaRoles.Panel,
      type: VirtualDomElements.Div,
    },
  ])
})
