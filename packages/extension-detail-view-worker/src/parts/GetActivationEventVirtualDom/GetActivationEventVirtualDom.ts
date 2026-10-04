import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivationEntry } from '../ActivationEntry/ActivationEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const li: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Li,
}

const code = {
  childCount: 1,
  type: VirtualDomElements.Code,
}

const invalidListItemClassName = MergeClassNames.mergeClassNames('ListItem', 'ListItemInvalid')

export const getActivationEventVirtualDom = (event: ActivationEntry): readonly VirtualDomNode[] => {
  const { errorMessage, isValid, stringValue } = event
  if (!isValid) {
    return [
      {
        childCount: 1,
        className: invalidListItemClassName,
        title: errorMessage,
        type: VirtualDomElements.Li,
      },
      code,
      text(stringValue),
    ]
  }
  return [li, code, text(stringValue)]
}
