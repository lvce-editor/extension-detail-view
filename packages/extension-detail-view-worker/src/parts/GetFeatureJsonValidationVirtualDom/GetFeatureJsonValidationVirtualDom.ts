import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetJsonValidationTableEntries from '../GetJsonValidationTableEntries/GetJsonValidationTableEntries.ts'
import * as GetTableVirtualDom from '../GetTableVirtualDom/GetTableVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getFeatureJsonValidationVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.jsonValidation()
  const tableInfo = GetJsonValidationTableEntries.getJsonValidationTableEntries(extension)
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
