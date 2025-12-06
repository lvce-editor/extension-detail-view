import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { formatTime } from '../FormatTime/FormatTime.ts'

export const getActivationTimeVirtualDom = (importTime: number, activationTime: number): readonly VirtualDomNode[] => {
  if (!activationTime && !importTime) {
    return []
  }
  const formattedImportTime = formatTime(importTime)
  const formattedTime = formatTime(activationTime)
  return [
    {
      childCount: 1,
      type: VirtualDomElements.Dt,
    },
    text(ExtensionDetailStrings.importTime()),
    {
      childCount: 1,
      type: VirtualDomElements.Dd,
    },
    text(formattedImportTime),
    {
      childCount: 1,
      type: VirtualDomElements.Dt,
    },
    text(ExtensionDetailStrings.activationTime()),
    {
      childCount: 1,
      type: VirtualDomElements.Dd,
    },
    text(formattedTime),
  ]
}
