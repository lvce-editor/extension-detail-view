import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SelectTabChangelog from '../SelectTabChangelog/SelectTabChangelog.ts'
import * as SelectTabDetails from '../SelectTabDetails/SelectTabDetails.ts'
import * as SelectTabFeatures from '../SelectTabFeatures/SelectTabFeatures.ts'

interface Handler {
  (state: ExtensionDetailState): Promise<ExtensionDetailState>
}

export const getSelectTabHandler = (selectedTab: string): Handler => {
  switch (selectedTab) {
    case InputName.Details:
      return SelectTabDetails.selectTabDetails
    case InputName.Features:
      return SelectTabFeatures.selectTab
    case InputName.Changelog:
      return SelectTabChangelog.selectTabChangelog
    default:
      throw new Error(`unexpected tab`)
  }
}
