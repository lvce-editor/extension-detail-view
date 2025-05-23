import type { Tab } from '../Tab/Tab.ts'
import * as InputName from '../InputName/InputName.ts'

export const getTabs = (selectedTab: string): readonly Tab[] => {
  const tabs: readonly Tab[] = [
    {
      label: 'Details',
      name: InputName.Details,
      selected: selectedTab === InputName.Details,
    },
    {
      label: 'Features',
      name: InputName.Features,
      selected: selectedTab === InputName.Features,
    },
    {
      label: 'Changelog',
      name: InputName.Changelog,
      selected: selectedTab === InputName.Changelog,
    },
  ]
  return tabs
}
