import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getCommandTableEntries = (extension: any): TableInfo => {
  const rows: Row[] = []
  const commands = extension.commands || []
  for (const command of commands) {
    // TODO watch out for command being null/undefined/number/string/array
    rows.push([
      {
        type: TableCellType.Code,
        value: command.id,
      },
      {
        type: TableCellType.Text,
        value: command.label,
      },
    ])
  }
  return {
    headings: ['ID', 'Label'],
    rows,
  }
}
