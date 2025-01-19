import * as InputName from '../InputName/InputName.ts'

export const getSavedSelectedFeature = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'selectedFeature' in savedState && typeof savedState.selectedFeature === 'string') {
    return savedState.selectedFeature
  }
  return InputName.Details
}
