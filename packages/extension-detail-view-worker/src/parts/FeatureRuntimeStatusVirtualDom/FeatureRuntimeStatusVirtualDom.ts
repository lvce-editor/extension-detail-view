import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { FeatureRuntimeStatusState } from '../FeatureRuntimeStatusDetails/FeatureRuntimeStatusDetails.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetActivationTimeVirtualDom from '../GetActivationTimeVirtualDom/GetActivationTimeVirtualDom.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetStatusVirtualDom from '../GetStatusVirtualDom/GetStatusVirtualDom.ts'

const featureContentNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.FeatureContent,
  type: VirtualDomElements.Div,
}

const getChildCount = (status: number, activationTime: number, importTime: number): number => {
  let childCount = 0
  childCount += 2 // status
  if (importTime || activationTime) {
    childCount += 4
  }
  return childCount
}

export const getRuntimeStatusVirtualDom = (state: FeatureRuntimeStatusState): readonly VirtualDomNode[] => {
  const { activationTime: displayedImportTime, importTime: displayedActivationTime, status } = state
  const heading = ExtensionDetailStrings.runtimeStatus()
  const childCount = getChildCount(status, displayedActivationTime, displayedImportTime)
  return [
    featureContentNode,
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    {
      childCount,
      className: 'RuntimeStatusDefinitionList',
      type: VirtualDomElements.Dl,
    },
    ...GetStatusVirtualDom.getStatusVirtualDom(status),
    ...GetActivationTimeVirtualDom.getActivationTimeVirtualDom(displayedImportTime, displayedActivationTime),
  ]
}
