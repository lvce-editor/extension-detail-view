import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

const getJsonValidationTableEntry = (validation: any): Row => {
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

export const getJsonValidationTableEntries = (extension: any): TableInfo => {
  const validations = extension.jsonValidation || []
  const rows: readonly Row[] = validations.map(getJsonValidationTableEntry)
  return {
    headings: ['File Match', 'Schema'],
    rows,
  }
}
