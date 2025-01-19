import type { CommandTableEntry } from '../CommandTableEntry/CommandTableEntry.ts'

export const getCommandTableEntries = (extension: any): readonly CommandTableEntry[] => {
  const entries: CommandTableEntry[] = []
  const commands = extension.commands || []
  for (const command of commands) {
    // TODO watch out for command being null/undefined/number/string/array
    entries.push({
      id: command.id,
      label: command.label,
    })
  }
  return entries
}
