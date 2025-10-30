import type { Row } from '../Row/Row.ts'
import { getLinkOrTextEntry } from '../GetLinkOrTextEntry/GetLinkOrTextEntry.ts'
import { getSchemaLinkUrl } from '../GetSchemaLinkUrl/GetSchemaLinkUrl.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getJsonValidationTableEntry = (validation: any, extensionUri: string): Row => {
  // TODO handle case when validation is invalid like null
  const { fileMatch } = validation
  const schema = validation.schema ?? validation.url
  const schemaLinkUrl = getSchemaLinkUrl(schema, extensionUri)
  return [
    {
      type: TableCellType.Code,
      value: fileMatch,
    },
    getLinkOrTextEntry(schema, schemaLinkUrl),
  ]
}
