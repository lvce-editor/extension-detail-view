import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Row } from '../Row/Row.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetProgrammingLanguagesTableEntries from '../GetProgrammingLanguagesTableEntries/GetProgrammingLanguagesTableEntries.ts'
import * as GetTableVirtualDom from '../GetTableVirtualDom/GetTableVirtualDom.ts'

export const getFeatureProgrammingLanguagesVirtualDom = (programmingLanguages: readonly Row[]): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.programmingLanguages()
  const top: readonly VirtualDomNode[] = [
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
  ]

  if (programmingLanguages.length === 0) {
    return [...top, { childCount: 1, type: VirtualDomElements.P }, text('Empty Array.')]
  }

  const tableInfo = GetProgrammingLanguagesTableEntries.getProgrammingLanguagesTableEntries(programmingLanguages)
  return [...top, ...GetTableVirtualDom.getTableVirtualDom(tableInfo)]
}
