import { expect, test } from '@jest/globals'
import * as GetCellCodeVirtualDom from '../src/parts/GetCellCodeVirtualDom/GetCellCodeVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('get cell code virtual dom with string value', () => {
  const value = 'npm install'
  expect(GetCellCodeVirtualDom.getCellCodeVirtualDom(value)).toEqual([
    {
      type: 11,
      className: 'TableCell',
      childCount: 1,
    },
    {
      type: 4,
      childCount: 1,
    },
    text('npm install'),
  ])
})
