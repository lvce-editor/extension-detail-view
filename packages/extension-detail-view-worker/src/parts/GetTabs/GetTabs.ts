import type { Tab } from '../Tab/Tab.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as InputName from '../InputName/InputName.ts'

export const getTabs = (selectedTab: string): readonly Tab[] => {
  const tabs: readonly Tab[] = [
    {
      label: ExtensionDetailStrings.details(),
      name: InputName.Details,
      selected: selectedTab === InputName.Details,
    },
    {
      label: ExtensionDetailStrings.features(),
      name: InputName.Features,
      selected: selectedTab === InputName.Features,
    },
    {
      label: ExtensionDetailStrings.changelog(),
      name: InputName.Changelog,
      selected: selectedTab === InputName.Changelog,
    },
  ]
  return tabs
}
