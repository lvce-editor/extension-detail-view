import { expect, test } from '@jest/globals'
import { getCellCheckMarkVirtualDom } from '../src/parts/GetCellCheckMarkVirtualDom/GetCellCheckMarkVirtualDom.ts'
import { getCellCodeListVirtualDom } from '../src/parts/GetCellCodeListVirtualDom/GetCellCodeListVirtualDom.ts'
import * as GetCellCodeVirtualDom from '../src/parts/GetCellCodeVirtualDom/GetCellCodeVirtualDom.ts'
import { getCellLinkVirtualDom } from '../src/parts/GetCellLinkVirtualDom/GetCellLinkVirtualDom.ts'
import * as GetCellRenderer from '../src/parts/GetCellRenderer/GetCellRenderer.ts'
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

test('returns link cell renderer', () => {
  const renderer = GetCellRenderer.getCellRenderer(TableCellType.Link)
  expect(renderer).toBe(getCellLinkVirtualDom)
})

test('returns code list cell renderer', () => {
  const renderer = GetCellRenderer.getCellRenderer(TableCellType.CodeList)
  expect(renderer).toBe(getCellCodeListVirtualDom)
})

test('returns check mark cell renderer', () => {
  const renderer = GetCellRenderer.getCellRenderer(TableCellType.CheckMark)
  expect(renderer).toBe(getCellCheckMarkVirtualDom)
})

test('throws error for unknown cell type', () => {
  expect(() => GetCellRenderer.getCellRenderer(999)).toThrow('unexpected cell type 999')
})

test('throws error for negative cell type', () => {
  expect(() => GetCellRenderer.getCellRenderer(-1)).toThrow('unexpected cell type -1')
})

test('throws error for zero cell type', () => {
  expect(() => GetCellRenderer.getCellRenderer(0)).toThrow('unexpected cell type 0')
})
