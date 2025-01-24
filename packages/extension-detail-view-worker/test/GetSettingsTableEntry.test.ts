import { expect, test } from '@jest/globals'
import * as GetSettingsTableEntry from '../src/parts/GetSettingsTableEntry/GetSettingsTableEntry.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('converts setting to table entry', () => {
  const setting = {
    id: 'editor.fontSize',
    label: 'Font Size',
  }
  expect(GetSettingsTableEntry.getSettingsTableEntry(setting)).toEqual([
    {
      type: TableCellType.Text,
      value: 'editor.fontSize',
    },
    {
      type: TableCellType.Text,
      value: 'Font Size',
    },
  ])
})

test('handles missing id and label', () => {
  const setting = {}
  expect(GetSettingsTableEntry.getSettingsTableEntry(setting)).toEqual([
    {
      type: TableCellType.Text,
      value: undefined,
    },
    {
      type: TableCellType.Text,
      value: undefined,
    },
  ])
})

test('handles null values', () => {
  const setting = {
    id: null,
    label: null,
  }
  expect(GetSettingsTableEntry.getSettingsTableEntry(setting)).toEqual([
    {
      type: TableCellType.Text,
      value: null,
    },
    {
      type: TableCellType.Text,
      value: null,
    },
  ])
})
