import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import { getStatusMessage } from '../GetStatusMessage/GetStatusMessage.ts'

const formatTime = (time: number): string => {
  return time.toFixed(2) + 'ms'
}

const getActivationTimeVirtualDom = (activationTime: number): readonly VirtualDomNode[] => {
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

const getStatusVirtualDom = (status: number): readonly VirtualDomNode[] => {
  const statusString = getStatusMessage(status)
  return [
    {
      type: VirtualDomElements.P,
      childCount: 2,
    },
    text(`Status: `), // i18n
    text(`${statusString}`),
  ]
}

const getChildCount = (status: number, activationTime: number): number => {
  let childCount = 1 // heading
  childCount++ // status
  if (activationTime) {
    childCount++ // activation time
  }
  return childCount
}

export const getRuntimeStatusVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  const { status, activationTime } = state
  const heading = ExtensionDetailStrings.runtimeStatus()
  const childCount = getChildCount(status, activationTime)
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: childCount,
    },
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    ...getStatusVirtualDom(status),
    ...getActivationTimeVirtualDom(activationTime),
  ]
}
