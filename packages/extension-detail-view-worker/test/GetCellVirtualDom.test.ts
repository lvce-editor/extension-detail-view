import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetCellVirtualDom from '../src/parts/GetCellVirtualDom/GetCellVirtualDom.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

const emptyCellDom = [
  {
    childCount: 1,
    className: ClassNames.TableCell,
    type: VirtualDomElements.Td,
  },
  text('-'),
]

test('renders a placeholder for an empty text cell', () => {
  expect(GetCellVirtualDom.getCellVirtualDom({ type: TableCellType.Text, value: '' })).toEqual(emptyCellDom)
})

test('renders a placeholder for an undefined text cell', () => {
  expect(GetCellVirtualDom.getCellVirtualDom({ type: TableCellType.Text, value: undefined as any })).toEqual(emptyCellDom)
})

test('renders a placeholder for an empty code list cell', () => {
  expect(GetCellVirtualDom.getCellVirtualDom({ listItems: [], type: TableCellType.CodeList, value: '' })).toEqual(emptyCellDom)
})

test('renders check mark cells normally', () => {
  expect(GetCellVirtualDom.getCellVirtualDom({ checked: false, type: TableCellType.CheckMark, value: '' })).toEqual([
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    text('no'),
  ])
})
