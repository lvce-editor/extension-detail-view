import type { FeatureState } from '../FeatureState/FeatureState.ts'
import * as GetSettingsTableEntry from '../GetSettingsTableEntry/GetSettingsTableEntry.ts'

export type FeatureSettingsState = FeatureState<'settings'>

export const getSettingsDetails = async (extension: any): Promise<FeatureSettingsState> => {
  const settings = extension.settings || []
  const rows = settings.map(GetSettingsTableEntry.getSettingsTableEntry)
  return {
    settings: rows,
  }
}
