import type { JsonValidationInfo } from '../GetJsonValidationInfos/GetJsonValidationInfos.ts'
import type { Row } from '../Row/Row.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getJsonValidationTableEntry = (validationInfo: JsonValidationInfo): Row => {
  const { errorMessage, fileMatch, isValid, schemaUrl, stringValue } = validationInfo
  if (!isValid && schemaUrl) {
    return [
      { type: TableCellType.Code, value: fileMatch },
      {
        className: ClassNames.TableCellInvalid,
        href: schemaUrl,
        title: errorMessage,
        type: TableCellType.Link,
        value: stringValue,
      },
    ]
  }
  if (!isValid) {
    return [
      {
        type: TableCellType.Text,
        value: fileMatch,
      },
      {
        className: ClassNames.TableCellInvalid,
        title: errorMessage,
        type: TableCellType.Text,
        value: stringValue,
      },
    ]
  }
  if (schemaUrl) {
    return [
      { type: TableCellType.Code, value: fileMatch },
      { href: schemaUrl, type: TableCellType.Link, value: stringValue },
    ]
  }

  return [
    { type: TableCellType.Code, value: fileMatch },
    {
      type: TableCellType.Text,
      value: stringValue,
    },
  ]
}
