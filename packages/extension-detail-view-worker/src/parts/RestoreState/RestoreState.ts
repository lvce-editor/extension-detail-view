import type { RestoredState } from '../RestoredState/RestoredState.ts'
import * as GetSavedChangelogScrollTop from '../GetSavedChangelogScrollTop/GetSavedChangelogScrollTop.ts'
import * as GetSavedReadmeScrollTop from '../GetSavedReadmeScrollTop/GetSavedReadmeScrollTop.ts'
import * as GetSavedSelectedFeature from '../GetSavedSelectedFeature/GetSavedSelectedFeature.ts'
import * as GetSavedSelectedTab from '../GetSavedSelectedTab/GetSavedSelectedTab.ts'
import * as InputName from '../InputName/InputName.ts'

export const restoreState = (savedState: unknown): RestoredState => {
  const savedSelectedTab = GetSavedSelectedTab.getSavedSelectedTab(savedState)
  const savedSelectedFeature = GetSavedSelectedFeature.getSavedSelectedFeature(savedState)
  const selectedTab = savedSelectedTab === InputName.Security ? InputName.Features : savedSelectedTab
  const selectedFeature = savedSelectedTab === InputName.Security ? InputName.Security : savedSelectedFeature
  const readmeScrollTop = GetSavedReadmeScrollTop.getSavedReadmeScrollTop(savedState)
  const changelogScrollTop = GetSavedChangelogScrollTop.getSavedChangelogScrollTop(savedState)
  return {
    changelogScrollTop,
    readmeScrollTop,
    selectedFeature,
    selectedTab,
  }
}
