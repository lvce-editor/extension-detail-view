import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { formatTime } from '../FormatTime/FormatTime.ts'

export const getActivationTimeVirtualDom = (importTime: number, activationTime: number): readonly VirtualDomNode[] => {
  if (!activationTime && !importTime) {
    return []
  }
  const formattedImportTime = formatTime(importTime)
  const formattedTime = formatTime(activationTime)
  return [
    {
      type: VirtualDomElements.P,
      childCount: 4,
    },
    text('Import Time: '), // i18n
    text(formattedImportTime),
    text('Activation Time: '), // i18n
    text(formattedTime),
  ]
}
