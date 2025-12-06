import type { Tab } from '../Tab/Tab.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as InputName from '../InputName/InputName.ts'

export const getTabs = (selectedTab: string, hasReadme: boolean, hasFeatures: boolean, hasChangelog: boolean): readonly Tab[] => {
  const tabs: readonly Tab[] = [
    {
      enabled: hasReadme,
      label: ExtensionDetailStrings.details(),
      name: InputName.Details,
      selected: selectedTab === InputName.Details,
    },
    {
      enabled: hasFeatures,
      label: ExtensionDetailStrings.features(),
      name: InputName.Features,
      selected: selectedTab === InputName.Features,
    },
    {
      enabled: hasChangelog,
      label: ExtensionDetailStrings.changelog(),
      name: InputName.Changelog,
      selected: selectedTab === InputName.Changelog,
    },
  ]
  return tabs
}
