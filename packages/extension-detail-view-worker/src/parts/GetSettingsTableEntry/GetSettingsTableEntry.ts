import type { Row } from '../Row/Row.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

const getDescriptionValue = (description: unknown, label: unknown): string => {
  if (typeof description === 'string') {
    return description
  }
  if (typeof label === 'string') {
    return label
  }
  return ''
}

const getDefaultValueText = (defaultValue: unknown): string => {
  if (defaultValue === undefined) {
    return ''
  }
  if (typeof defaultValue === 'string') {
    return defaultValue
  }
  try {
    return JSON.stringify(defaultValue) ?? ''
  } catch {
    return ''
  }
}

export const getSettingsTableEntry = (setting: any): Row => {
  const { default: defaultValue, description, id, label } = setting
  const descriptionValue = getDescriptionValue(description, label)
  const defaultText = getDefaultValueText(defaultValue)
  return [
    {
      type: TableCellType.Text,
      value: id,
    },
    {
      type: TableCellType.Text,
      value: descriptionValue,
    },
    {
      type: TableCellType.Text,
      value: defaultText,
      ...(defaultValue === '' && { preserveEmptyValue: true }),
    },
  ]
}
