import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as GetSettingsTableEntries from '../GetSettingsTableEntries/GetSettingsTableEntries.ts'
import * as GetTableVirtualDom from '../GetTableVirtualDom/GetTableVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureSettingsVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const heading = 'Settings'
  const tableInfo = GetSettingsTableEntries.getSettingsTableEntries(extension)
  return [
    {
      type: VirtualDomElements.Div,
      className: 'FeatureSettings',
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(heading),
    ...GetTableVirtualDom.getTableVirtualDom(tableInfo),
  ]
}
