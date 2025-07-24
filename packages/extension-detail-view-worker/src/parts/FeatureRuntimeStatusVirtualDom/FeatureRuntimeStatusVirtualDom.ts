import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getActivationTimeVirtualDom } from '../GetActivationTimeVirtualDom/GetActivationTimeVirtualDom.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import { getStatusVirtualDom } from '../GetStatusVirtualDom/GetStatusVirtualDom.ts'

const getChildCount = (status: number, activationTime: number): number => {
  let childCount = 1 // heading
  childCount++ // status
  if (activationTime) {
    childCount++ // activation time
  }
  return childCount
}

export const getRuntimeStatusVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  const { status, activationTime, importTime } = state
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
    ...getActivationTimeVirtualDom(activationTime, importTime),
  ]
}
