import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetCommandTableEntry from '../GetCommandTableEntry/GetCommandTableEntry.ts'
import * as GetFeatureCommandsVirtualDom from '../GetFeatureCommandsVirtualDom/GetFeatureCommandsVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

const hasCommands = (extension: any): boolean => {
  return extension && extension.commands
}

const getCommandsDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const commands = extension.commands || []
  const rows = commands.map(GetCommandTableEntry.getCommandTableEntry)
  return {
    commands: rows,
  }
}

const getCommandsVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom(state.commands)
}

export const id = InputName.Commands
export const getLabel = ExtensionDetailStrings.commands
export const isEnabled = hasCommands
export const getDetails = getCommandsDetails
export const getVirtualDom = getCommandsVirtualDom
