import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetCommandTableEntries from '../GetCommandTableEntries/GetCommandTableEntries.ts'
import * as GetTableVirtualDom from '../GetTableVirtualDom/GetTableVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureCommandsVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.commands()
  const tableInfo = GetCommandTableEntries.getCommandTableEntries(extension)
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureCommands,
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
