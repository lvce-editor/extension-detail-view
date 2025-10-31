import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getProgrammingLanguageTableEntry } from '../GetProgrammingLanguageTableEntry/GetProgrammingLanguageTableEntry.ts'

export const getFeatureDetailsProgrammingLanguages = (extension: any): Partial<ExtensionDetailState> => {
  // TODO validate them also, to create better types
  const programmingLanguages = extension.languages || []
  const rows = programmingLanguages.map(getProgrammingLanguageTableEntry)
  return {
    programmingLanguages: rows,
  }
}
