import type { Row } from '../Row/Row.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getJsonValidationTableEntry = (validation: any): Row => {
  const { fileMatch, schema } = validation
  return [
    {
      type: TableCellType.Code,
      value: fileMatch,
    },
    {
      type: TableCellType.Code,
      value: schema,
    },
  ]
}
