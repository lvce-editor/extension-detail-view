import type { Tab } from '../Tab/Tab.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getTabVirtualDom = (tab: Tab): readonly VirtualDomNode[] => {
  const { label, selected } = tab
  const className = selected ? 'ExtensionDetailTab ExtensionDetailTabSelected' : 'ExtensionDetailTab'
  return [
    {
      type: VirtualDomElements.Div,
      className,
      childCount: 1,
    },
    text(label),
  ]
}
