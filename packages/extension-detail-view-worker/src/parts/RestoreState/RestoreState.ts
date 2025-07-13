import type { RestoredState } from '../RestoredState/RestoredState.ts'
import * as GetSavedSelectedFeature from '../GetSavedSelectedFeature/GetSavedSelectedFeature.ts'
import * as GetSavedSelectedTab from '../GetSavedSelectedTab/GetSavedSelectedTab.ts'
import * as GetSavedReadmeScrollTop from '../GetSavedReadmeScrollTop/GetSavedReadmeScrollTop.ts'

export const restoreState = (savedState: unknown): RestoredState => {
  const selectedTab = GetSavedSelectedTab.getSavedSelectedTab(savedState)
  const selectedFeature = GetSavedSelectedFeature.getSavedSelectedFeature(savedState)
  const readmeScrollTop = GetSavedReadmeScrollTop.getSavedReadmeScrollTop(savedState)
  return {
    selectedFeature,
    selectedTab,
    readmeScrollTop,
  }
}
