import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getSizeEntries = (showSizeLink: boolean, displaySize: string, extensionUri: string): readonly MoreInfoEntry[] => {
  if (!showSizeLink) {
    return []
  }
  return [
    {
      key: ExtensionDetailStrings.size(),
      onClick: DomEventListenerFunctions.HandleClickSize,
      title: extensionUri,
      value: displaySize,
    },
  ]
}
