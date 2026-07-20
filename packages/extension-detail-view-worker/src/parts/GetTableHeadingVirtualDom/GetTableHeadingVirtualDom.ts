import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const tableHeadingNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.TableHeading,
  type: VirtualDomElements.Th,
}

export const getTableHeadingVirtualDom = (heading: string): readonly VirtualDomNode[] => {
  return [tableHeadingNode, text(heading)]
}
