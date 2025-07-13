import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetSettingsTableEntry from '../GetSettingsTableEntry/GetSettingsTableEntry.ts'

export const getSettingsDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const settings = extension.settings || []
  const rows = settings.map(GetSettingsTableEntry.getSettingsTableEntry)
  return {
    settings: rows,
  }
}