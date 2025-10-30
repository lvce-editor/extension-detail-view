import type { JsonValidationInfo } from '../GetJsonValidationInfos/GetJsonValidationInfos.ts'
import type { Row } from '../Row/Row.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getJsonValidationTableEntry = (validationInfo: JsonValidationInfo): Row => {
  const { isValid, errorMessage, schemaUrl, stringValue, fileMatch } = validationInfo
  if (!isValid && schemaUrl) {
    return [
      { type: TableCellType.Code, value: fileMatch },
      {
        type: TableCellType.Link,
        value: stringValue,
        href: schemaUrl,
        className: ClassNames.TableCellInvalid,
        title: errorMessage,
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
        type: TableCellType.Text,
        value: stringValue,
        className: ClassNames.TableCellInvalid,
        title: errorMessage,
      },
    ]
  }
  if (schemaUrl) {
    return [
      { type: TableCellType.Code, value: fileMatch },
      { type: TableCellType.Link, value: stringValue, href: schemaUrl },
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
