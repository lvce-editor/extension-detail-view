import { expect, test } from '@jest/globals'
import * as GetCellRenderer from '../src/parts/GetCellRenderer/GetCellRenderer.ts'
import * as GetCellCodeVirtualDom from '../src/parts/GetCellCodeVirtualDom/GetCellCodeVirtualDom.ts'
import * as GetCellTextVirtualDom from '../src/parts/GetCellTextVirtualDom/GetCellTextVirtualDom.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('returns code cell renderer', () => {
  const renderer = GetCellRenderer.getCellRenderer(TableCellType.Code)
  expect(renderer).toBe(GetCellCodeVirtualDom.getCellCodeVirtualDom)
})

test('returns text cell renderer', () => {
  const renderer = GetCellRenderer.getCellRenderer(TableCellType.Text)
  expect(renderer).toBe(GetCellTextVirtualDom.getCellTextVirtualDom)
})

test('throws error for unknown cell type', () => {
  expect(() => GetCellRenderer.getCellRenderer(999)).toThrow('unexpected cell type 999')
})
