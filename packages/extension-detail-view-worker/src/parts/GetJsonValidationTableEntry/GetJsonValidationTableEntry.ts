import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { Cell } from '../Cell/Cell.ts'
import type { Row } from '../Row/Row.ts'
import { getSchemaLinkUrl } from '../GetSchemaLinkUrl/GetSchemaLinkUrl.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

const getLinkOrTextEntry = (schema: string, schemaLinkUrl: string): Cell => {
  if (schemaLinkUrl) {
    return {
      type: TableCellType.Link,
      value: schema,
      href: schemaLinkUrl,
    }
  }
  return {
    type: TableCellType.Text,
    value: schema,
  }
}

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
