import type { Row } from '../Row/Row.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getSettingsTableEntry = (setting: any): Row => {
  const { id, label } = setting
  // TODO watch out for  null/undefined/number/string/array
  return [
    {
      type: TableCellType.Text,
      value: id,
    },
    {
      type: TableCellType.Text,
      value: label,
    },
  ]
}
