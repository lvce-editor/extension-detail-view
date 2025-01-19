import type { Row, TableInfo } from '../TableInfo/TableInfo.ts'

export const getJsonValidationTableEntries = (extension: any): TableInfo => {
  const rows: Row[] = []
  const validations = extension.jsonValidation || []
  for (const validation of validations) {
    const { fileMatch, schema } = validation
    rows.push([fileMatch, schema])
  }
  return {
    headings: ['File Match', 'Schema'],
    rows,
  }
}
