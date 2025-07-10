import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Row } from '../Row/Row.ts'
import * as GetCommandTableEntry from '../GetCommandTableEntry/GetCommandTableEntry.ts'

export const getFeatureDetailsCommand = (extension: any): Partial<ExtensionDetailState> => {
  const commands = extension.commands || []
  const rows: readonly Row[] = commands.map(GetCommandTableEntry.getCommandTableEntry)
  return {
    commands: rows,
  }
}
