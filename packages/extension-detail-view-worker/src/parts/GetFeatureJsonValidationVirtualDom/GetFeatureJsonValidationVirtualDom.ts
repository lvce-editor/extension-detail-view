import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetJsonValidationTableEntries from '../GetJsonValidationTableEntries/GetJsonValidationTableEntries.ts'
import * as GetTableVirtualDom from '../GetTableVirtualDom/GetTableVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureJsonValidationVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  // TODO use i18n
  const heading = 'Json Validation'
  const tableInfo = GetJsonValidationTableEntries.getJsonValidationTableEntries(extension)
  return [
    {
      type: VirtualDomElements.Div,
      className: 'FeatureJsonValidation',
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
