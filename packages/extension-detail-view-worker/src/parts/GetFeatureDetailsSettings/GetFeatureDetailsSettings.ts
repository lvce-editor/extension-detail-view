import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Row } from '../Row/Row.ts'
import * as GetSettingsTableEntry from '../GetSettingsTableEntry/GetSettingsTableEntry.ts'

export const getFeatureDetailsSettings = (extension: any): Partial<ExtensionDetailState> => {
  const settings = extension.settings || []
  const rows: readonly Row[] = settings.map(GetSettingsTableEntry.getSettingsTableEntry)
  return {
    settings: rows,
  }
}
