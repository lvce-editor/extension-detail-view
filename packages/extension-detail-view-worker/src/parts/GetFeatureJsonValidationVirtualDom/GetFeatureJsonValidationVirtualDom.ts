import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Row } from '../Row/Row.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetJsonValidationTableEntries from '../GetJsonValidationTableEntries/GetJsonValidationTableEntries.ts'
import * as GetTableVirtualDom from '../GetTableVirtualDom/GetTableVirtualDom.ts'

const parentNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.FeatureContent,
  type: VirtualDomElements.Div,
}

export const getFeatureJsonValidationVirtualDom = (jsonValidation: readonly Row[]): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.jsonValidation()
  const tableInfo = GetJsonValidationTableEntries.getJsonValidationTableEntries(jsonValidation)
  return [
    parentNode,
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    ...GetTableVirtualDom.getTableVirtualDom(tableInfo),
  ]
}
