import { expect, test } from '@jest/globals'
import * as GetCellTextVirtualDom from '../src/parts/GetCellTextVirtualDom/GetCellTextVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('get cell text virtual dom with string value', () => {
  const value = 'Test Value'
  expect(GetCellTextVirtualDom.getCellTextVirtualDom(value)).toEqual([
    {
      type: 11,
      className: 'TableCell',
      childCount: 1,
    },
    text('Test Value'),
  ])
})
