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
      type: VirtualDomElements.Dt,
      childCount: 1,
    },
    text(ExtensionDetailStrings.importTime()),
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
    },
    text(formattedImportTime),
    {
      type: VirtualDomElements.Dt,
      childCount: 1,
    },
    text(ExtensionDetailStrings.activationTime()),
    {
      type: VirtualDomElements.Dd,
      childCount: 1,
    },
    text(formattedTime),
  ]
}
