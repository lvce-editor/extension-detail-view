import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivationEntry } from '../ActivationEntry/ActivationEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

const li: VirtualDomNode = {
  type: VirtualDomElements.Li,
  childCount: 1,
}

const code = {
  type: VirtualDomElements.Code,
  childCount: 1,
}

export const getActivationEventVirtualDom = (event: ActivationEntry): readonly VirtualDomNode[] => {
  const { stringValue, errorMessage, isValid } = event
  if (!isValid) {
    return [
      {
        type: VirtualDomElements.Li,
        childCount: 1,
        title: errorMessage,
        className: 'ListItem ListItemInvalid',
      },
      code,
      text(stringValue),
    ]
  }
  return [li, code, text(stringValue)]
}
