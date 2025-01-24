import { expect, test } from '@jest/globals'
import * as GetCellTextVirtualDom from '../src/parts/GetCellTextVirtualDom/GetCellTextVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('get cell text virtual dom with string value', () => {
  const value = 'Test Value'
  expect(GetCellTextVirtualDom.getCellTextVirtualDom(value)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'TableCell',
      childCount: 1,
    },
    text('Test Value'),
  ])
})
