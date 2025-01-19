import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetCommandTableEntries from '../GetCommandTableEntries/GetCommandTableEntries.ts'
import * as GetTableVirtualDom from '../GetTableVirtualDom/GetTableVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureCommandsVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  // TODO use i18n strings
  const heading = 'Commands'
  const tableInfo = GetCommandTableEntries.getCommandTableEntries(extension)
  return [
    {
      type: VirtualDomElements.Div,
      className: 'FeatureCommands',
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
