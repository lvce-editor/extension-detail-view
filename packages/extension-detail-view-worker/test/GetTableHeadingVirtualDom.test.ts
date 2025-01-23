import { expect, test } from '@jest/globals'
import * as GetTableHeadingVirtualDom from '../src/parts/GetTableHeadingVirtualDom/GetTableHeadingVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
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
