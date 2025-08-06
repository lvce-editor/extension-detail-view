import type { Row } from '../Row/Row.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getJsonValidationTableEntry = (validation: any): Row => {
  // TODO handle case when validation is invalid like null
  const { fileMatch } = validation
  const schema = validation.schema || validation.url
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
