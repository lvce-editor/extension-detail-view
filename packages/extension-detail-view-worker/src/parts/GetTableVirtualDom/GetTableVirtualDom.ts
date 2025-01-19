import type { CommandTableEntry } from '../CommandTableEntry/CommandTableEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getTableHeadingVirtualDom = (heading: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Th,
      childCount: 1,
    },
    text(heading),
  ]
}

const getTableRowVirtualDom = (entry: CommandTableEntry): readonly VirtualDomNode[] => {
  const { id, label } = entry
  return [
    {
      type: VirtualDomElements.Tr,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Td,
      childCount: 1,
    },
    text(id),
    {
      type: VirtualDomElements.Td,
      childCount: 1,
    },
    text(label),
  ]
}

export const getTableVirtualDom = (headings: readonly string[], entries: readonly CommandTableEntry[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Table,
      className: 'Table',
      childCount: 2,
    },
    {
      type: VirtualDomElements.THead,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Tr,
      childCount: headings.length,
    },
    ...headings.flatMap(getTableHeadingVirtualDom),
    {
      type: VirtualDomElements.TBody,
      childCount: entries.length,
    },
    ...entries.flatMap(getTableRowVirtualDom),
  ]
}
