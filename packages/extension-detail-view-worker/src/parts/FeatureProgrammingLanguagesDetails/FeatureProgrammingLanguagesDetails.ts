import type { FeatureState } from '../FeatureState/FeatureState.ts'
import { getProgrammingLanguageTableEntry } from '../GetProgrammingLanguageTableEntry/GetProgrammingLanguageTableEntry.ts'

export type FeatureProgrammingLanguagesState = FeatureState<'programmingLanguages'>

export const getFeatureDetailsProgrammingLanguages = async (extension: any): Promise<FeatureProgrammingLanguagesState> => {
  // TODO validate them also, to create better types
  const programmingLanguages = extension.languages || []
  const rows = programmingLanguages.map(getProgrammingLanguageTableEntry)
  return {
    programmingLanguages: rows,
  }
}
