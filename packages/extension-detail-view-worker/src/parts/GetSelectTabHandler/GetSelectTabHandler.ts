import type { SelectTabHandler } from '../SelectTabHandler/SelectTabHandler.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SelectTabChangelog from '../SelectTabChangelog/SelectTabChangelog.ts'
import * as SelectTabDefault from '../SelectTabDefault/SelectTabDefault.ts'
import * as SelectTabDetails from '../SelectTabDetails/SelectTabDetails.ts'
import * as SelectTabFeatures from '../SelectTabFeatures/SelectTabFeatures.ts'

export const getSelectTabHandler = (selectedTab: string): SelectTabHandler => {
  switch (selectedTab) {
    case InputName.Details:
      return SelectTabDetails.selectTabDetails
    case InputName.Features:
      return SelectTabFeatures.selectTab
    case InputName.Changelog:
      return SelectTabChangelog.selectTabChangelog
    default:
      return SelectTabDefault.selectTabDefault
  }
}
