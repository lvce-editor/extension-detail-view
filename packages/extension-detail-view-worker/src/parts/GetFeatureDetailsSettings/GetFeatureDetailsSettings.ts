import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Row } from '../Row/Row.ts'
import * as GetSettingsTableEntry from '../GetSettingsTableEntry/GetSettingsTableEntry.ts'

export const getFeatureDetailsSettings = (extension: any): Partial<ExtensionDetailState> => {
  const settings = Array.isArray(extension?.settings) ? extension.settings : []
  const rows: readonly Row[] = settings
    .filter((setting: unknown) => typeof setting === 'object' && setting !== null && typeof (setting as { id?: unknown }).id === 'string')
    .map(GetSettingsTableEntry.getSettingsTableEntry)
  return {
    settings: rows,
  }
}
