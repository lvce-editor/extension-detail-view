import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetCellTextVirtualDom from '../src/parts/GetCellTextVirtualDom/GetCellTextVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('get cell text virtual dom with string value', () => {
  const value = 'Test Value'
  expect(GetCellTextVirtualDom.getCellTextVirtualDom(value)).toEqual([
    {
      childCount: 1,
      className: 'TableCell',
      type: VirtualDomElements.Td,
    },
    text('Test Value'),
  ])
})
