import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getTableHeadingVirtualDom = (heading: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.TableHeading,
      type: VirtualDomElements.Th,
    },
    text(heading),
  ]
}
