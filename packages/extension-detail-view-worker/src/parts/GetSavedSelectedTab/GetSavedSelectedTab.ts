import * as InputName from '../InputName/InputName.ts'

export const getSavedSelectedTab = (savedState: unknown): string => {
  if (savedState && typeof savedState === 'object' && 'selectedTab' in savedState && typeof savedState.selectedTab === 'string') {
    return savedState.selectedTab
  }
  return InputName.Details
}
