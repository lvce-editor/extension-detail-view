import { expect, test } from '@jest/globals'
import * as GetSettingsTableEntry from '../src/parts/GetSettingsTableEntry/GetSettingsTableEntry.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('converts setting to table entry', () => {
  const setting = {
    default: 15,
    description: 'Controls the font size in pixels',
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
      value: 'Controls the font size in pixels',
    },
    {
      type: TableCellType.Text,
      value: '15',
    },
  ])
})

test('handles legacy label and missing default', () => {
  expect(GetSettingsTableEntry.getSettingsTableEntry({ id: 'legacy.setting', label: 'Legacy description' })).toEqual([
    { type: TableCellType.Text, value: 'legacy.setting' },
    { type: TableCellType.Text, value: 'Legacy description' },
    { type: TableCellType.Text, value: '' },
  ])
})

test.each([
  [false, 'false'],
  [0, '0'],
  ['', ''],
  [null, 'null'],
])('renders default %s as %s', (defaultValue, expected) => {
  const defaultCell = GetSettingsTableEntry.getSettingsTableEntry({ default: defaultValue, id: 'test.setting' })[2]
  expect(defaultCell.type).toBe(TableCellType.Text)
  expect(defaultCell.value).toBe(expected)
  expect(Boolean(defaultCell.preserveEmptyValue)).toBe(defaultValue === '')
})

test('serializes object defaults as JSON', () => {
  expect(GetSettingsTableEntry.getSettingsTableEntry({ default: { enabled: false }, id: 'test.setting' })[2].value).toBe('{"enabled":false}')
})

test('handles malformed circular defaults', () => {
  const defaultValue: Record<string, unknown> = {}
  defaultValue.self = defaultValue
  expect(GetSettingsTableEntry.getSettingsTableEntry({ default: defaultValue, id: 'test.setting' })[2].value).toBe('')
})
