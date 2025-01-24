import { expect, test } from '@jest/globals'
import * as GetCommandTableEntry from '../src/parts/GetCommandTableEntry/GetCommandTableEntry.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('get command table entry with title and command', () => {
  const command = {
    id: 'workbench.action.openFile',
    label: 'Open File',
  }
  expect(GetCommandTableEntry.getCommandTableEntry(command)).toEqual([
    {
      type: TableCellType.Code,
      value: 'workbench.action.openFile',
    },
    {
      type: TableCellType.Text,
      value: 'Open File',
    },
  ])
})

test('get command table entry with empty values', () => {
  const command = {
    id: '',
    label: '',
  }
  expect(GetCommandTableEntry.getCommandTableEntry(command)).toEqual([
    {
      type: TableCellType.Code,
      value: '',
    },
    {
      type: TableCellType.Text,
      value: '',
    },
  ])
})

test('get command table entry with missing values', () => {
  const command = {}
  expect(GetCommandTableEntry.getCommandTableEntry(command)).toEqual([
    {
      type: TableCellType.Text,
      value: '',
    },
    {
      type: TableCellType.Code,
      value: '',
    },
  ])
})

test('get command table entry with additional properties', () => {
  const command = {
    id: 'workbench.action.saveFile',
    label: 'Save File',
    shortcut: 'Ctrl+S',
    category: 'File',
  }
  expect(GetCommandTableEntry.getCommandTableEntry(command)).toEqual([
    {
      type: TableCellType.Text,
      value: 'Save File',
    },
    {
      type: TableCellType.Code,
      value: 'workbench.action.saveFile',
    },
  ])
})
