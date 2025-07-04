import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetSettingsTableEntries from '../GetSettingsTableEntries/GetSettingsTableEntries.ts'
import * as GetTableVirtualDom from '../GetTableVirtualDom/GetTableVirtualDom.ts'

export const getFeatureSettingsVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.settings()
  const tableInfo = GetSettingsTableEntries.getSettingsTableEntries(extension)
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    ...GetTableVirtualDom.getTableVirtualDom(tableInfo),
  ]
}
