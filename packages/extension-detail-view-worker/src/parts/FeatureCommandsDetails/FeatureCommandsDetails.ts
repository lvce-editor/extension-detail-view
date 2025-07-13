import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetCommandTableEntry from '../GetCommandTableEntry/GetCommandTableEntry.ts'

export const getCommandsDetails = async (extension: any): Promise<Partial<ExtensionDetailState>> => {
  const commands = extension.commands || []
  const rows = commands.map(GetCommandTableEntry.getCommandTableEntry)
  return {
    commands: rows,
  }
}