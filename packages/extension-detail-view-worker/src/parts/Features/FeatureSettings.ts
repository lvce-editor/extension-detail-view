import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureSettingsVirtualDom from '../GetFeatureSettingsVirtualDom/GetFeatureSettingsVirtualDom.ts'
import * as GetSettingsTableEntry from '../GetSettingsTableEntry/GetSettingsTableEntry.ts'
import * as InputName from '../InputName/InputName.ts'

const hasSettings = (extension: any): boolean => {
  return extension && extension.settings
}

const getSettingsDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const settings = extension.settings || []
  const rows = settings.map(GetSettingsTableEntry.getSettingsTableEntry)
  return {
    settings: rows,
  }
}

const getSettingsVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureSettingsVirtualDom.getFeatureSettingsVirtualDom(state.settings)
}

export const id = InputName.Settings
export const getLabel = ExtensionDetailStrings.settings
export const isEnabled = hasSettings
export const getDetails = getSettingsDetails
export const getVirtualDom = getSettingsVirtualDom
