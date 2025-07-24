import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { formatTime } from '../FormatTime/FormatTime.ts'

export const getActivationTimeVirtualDom = (activationTime: number): readonly VirtualDomNode[] => {
  if (!activationTime) {
    return []
  }
  const formattedTime = formatTime(activationTime)
  return [
    {
      type: VirtualDomElements.P,
      childCount: 2,
    },
    text('Activation Time: '), // i18n
    text(formattedTime),
  ]
}
