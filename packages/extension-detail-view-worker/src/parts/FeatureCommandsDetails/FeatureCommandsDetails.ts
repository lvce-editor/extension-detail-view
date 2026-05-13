import type { FeatureState } from '../FeatureState/FeatureState.ts'
import * as GetCommandTableEntry from '../GetCommandTableEntry/GetCommandTableEntry.ts'

export type FeatureCommandsState = FeatureState<'commands'>

export const getCommandsDetails = async (extension: any): Promise<FeatureCommandsState> => {
  const commands = extension.commands || []
  const rows = commands.map(GetCommandTableEntry.getCommandTableEntry)
  return {
    commands: rows,
  }
}
