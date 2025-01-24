import { expect, test } from '@jest/globals'
import * as GetCommandTableEntry from '../src/parts/GetCommandTableEntry/GetCommandTableEntry.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('get command table entry with title and command', () => {
  const command = {
    title: 'Open File',
    command: 'workbench.action.openFile',
  }
  expect(GetCommandTableEntry.getCommandTableEntry(command)).toEqual([
    {
      type: TableCellType.Text,
      value: 'Open File',
    },
    {
      type: TableCellType.Code,
      value: 'workbench.action.openFile',
    },
  ])
})

test('get command table entry with empty values', () => {
  const command = {
    title: '',
    command: '',
  }
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
    title: 'Save File',
    command: 'workbench.action.saveFile',
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
