import type { Row } from '../Row/Row.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getCommandTableEntry = (command: any): Row => {
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
