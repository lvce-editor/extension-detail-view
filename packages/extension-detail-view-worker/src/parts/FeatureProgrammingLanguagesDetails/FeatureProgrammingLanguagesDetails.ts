import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Row } from '../Row/Row.ts'
import { getProgrammingLanguageTableEntry } from '../GetProgrammingLanguageTableEntry/GetProgrammingLanguageTableEntry.ts'

export interface FeatureProgrammingLanguagesDetails {
  readonly programmingLanguages: readonly Row[]
  readonly x: number
}

export const getFeatureDetailsProgrammingLanguages = async (extension: any): Promise<FeatureProgrammingLanguagesDetails> => {
  // TODO validate them also, to create better types
  const programmingLanguages = extension.languages || []
  const rows = programmingLanguages.map(getProgrammingLanguageTableEntry)
  return {
    programmingLanguages: rows,
  }
}
