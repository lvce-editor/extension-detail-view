import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getActivationTimeVirtualDom } from '../GetActivationTimeVirtualDom/GetActivationTimeVirtualDom.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import { getStatusVirtualDom } from '../GetStatusVirtualDom/GetStatusVirtualDom.ts'

const getChildCount = (status: number, activationTime: number, importTime: number): number => {
  let childCount = 0
  childCount += 2 // status
  if (importTime || activationTime) {
    childCount += 4
  }
  return childCount
}

export const getRuntimeStatusVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  const { status, activationTime, importTime } = state
  const heading = ExtensionDetailStrings.runtimeStatus()
  const childCount = getChildCount(status, activationTime, importTime)
  console.log({ activationTime, importTime })
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    {
      type: VirtualDomElements.Dl,
      childCount,
    },
    ...getStatusVirtualDom(status),
    ...getActivationTimeVirtualDom(activationTime, importTime),
  ]
}
