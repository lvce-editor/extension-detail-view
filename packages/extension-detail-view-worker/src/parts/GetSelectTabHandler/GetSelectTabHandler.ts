import type { SelectTabHandler } from '../SelectTabHandler/SelectTabHandler.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SelectTabChangelog from '../SelectTabChangelog/SelectTabChangelog.ts'
import * as SelectTabContents from '../SelectTabContents/SelectTabContents.ts'
import * as SelectTabDefault from '../SelectTabDefault/SelectTabDefault.ts'
import * as SelectTabDetails from '../SelectTabDetails/SelectTabDetails.ts'
import * as SelectTabFeatures from '../SelectTabFeatures/SelectTabFeatures.ts'

export const getSelectTabHandler = (name: string): SelectTabHandler => {
  switch (name) {
    case InputName.Changelog:
      return SelectTabChangelog.selectTabChangelog
    case InputName.Contents:
      return SelectTabContents.selectTabContents
    case InputName.Details:
      return SelectTabDetails.selectTabDetails
    case InputName.Features:
      return SelectTabFeatures.selectTabFeatures
    default:
      return SelectTabDefault.selectTabDefault
  }
}
