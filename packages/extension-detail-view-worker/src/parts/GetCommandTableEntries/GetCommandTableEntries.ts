import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

const getCommandTableEntry = (command: any): Row => {
  // TODO watch out for command being null/undefined/number/string/array
  const { id, label } = command
  return [
    {
      type: TableCellType.Code,
      value: id,
    },
    {
      type: TableCellType.Text,
      value: label,
    },
  ]
}

export const getCommandTableEntries = (extension: any): TableInfo => {
  const commands = extension.commands || []
  const rows: readonly Row[] = commands.map(getCommandTableEntry)
  return {
    headings: ['ID', 'Label'],
    rows,
  }
}
