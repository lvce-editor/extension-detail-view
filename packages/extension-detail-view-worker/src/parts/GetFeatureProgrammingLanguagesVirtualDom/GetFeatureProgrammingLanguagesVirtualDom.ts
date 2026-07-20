import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Row } from '../Row/Row.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetProgrammingLanguagesTableEntries from '../GetProgrammingLanguagesTableEntries/GetProgrammingLanguagesTableEntries.ts'
import * as GetTableVirtualDom from '../GetTableVirtualDom/GetTableVirtualDom.ts'

const featureContentNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.FeatureContent,
  type: VirtualDomElements.Div,
}

const emptyProgrammingLanguagesNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.P,
}

export const getFeatureProgrammingLanguagesVirtualDom = (programmingLanguages: readonly Row[]): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.programmingLanguages()
  const top: readonly VirtualDomNode[] = [featureContentNode, ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading)]

  if (programmingLanguages.length === 0) {
    return [...top, emptyProgrammingLanguagesNode, text('Empty Array.')]
  }

  const tableInfo = GetProgrammingLanguagesTableEntries.getProgrammingLanguagesTableEntries(programmingLanguages)
  return [...top, ...GetTableVirtualDom.getTableVirtualDom(tableInfo)]
}
