import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Row } from '../Row/Row.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetCommandTableEntries from '../GetCommandTableEntries/GetCommandTableEntries.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetTableVirtualDom from '../GetTableVirtualDom/GetTableVirtualDom.ts'

export const getFeatureProgrammingLanguagesVirtualDom = (programmingLanguages: readonly Row[]): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.programmingLanguages()
  const tableInfo = GetCommandTableEntries.getCommandTableEntries(programmingLanguages)

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
