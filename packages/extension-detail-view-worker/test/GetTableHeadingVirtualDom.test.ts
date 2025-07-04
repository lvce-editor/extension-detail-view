import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetTableHeadingVirtualDom from '../src/parts/GetTableHeadingVirtualDom/GetTableHeadingVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('creates table heading virtual dom', () => {
  expect(GetTableHeadingVirtualDom.getTableHeadingVirtualDom('Name')).toEqual([
    {
      type: VirtualDomElements.Th,
      className: 'TableHeading',
      childCount: 1,
    },
    text('Name'),
  ])
})
