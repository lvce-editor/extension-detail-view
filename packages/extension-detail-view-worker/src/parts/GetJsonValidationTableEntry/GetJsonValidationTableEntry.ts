import type { Row } from '../Row/Row.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getLinkOrTextEntry } from '../GetLinkOrTextEntry/GetLinkOrTextEntry.ts'
import { getSchemaLinkUrl } from '../GetSchemaLinkUrl/GetSchemaLinkUrl.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getJsonValidationTableEntry = (validation: any, extensionUri: string): Row => {
  const invalidProps = { className: ClassNames.TableCellInvalid, title: 'property must be a string' }

  if (!validation || typeof validation !== 'object' || Array.isArray(validation)) {
    const shown = Array.isArray(validation) ? '[]' : String(validation)
    return [
      {
        type: TableCellType.Text,
        value: shown,
        ...invalidProps,
      },
      {
        type: TableCellType.Text,
        value: shown,
        ...invalidProps,
      },
    ]
  }

  const { fileMatch } = validation
  const schema = validation.schema ?? validation.url
  const schemaLinkUrl = getSchemaLinkUrl(schema, extensionUri)
  const leftCell =
    typeof fileMatch === 'string' || Array.isArray(fileMatch)
      ? { type: TableCellType.Code, value: fileMatch }
      : { type: TableCellType.Text, value: String(fileMatch), ...invalidProps }
  const rightEntry =
    typeof schema === 'string' ? getLinkOrTextEntry(schema, schemaLinkUrl) : { type: TableCellType.Text, value: String(schema), ...invalidProps }

  return [leftCell as any, rightEntry as any]
}
