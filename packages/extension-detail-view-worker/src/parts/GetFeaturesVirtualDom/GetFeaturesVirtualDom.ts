import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getFeatureVirtualDomHandler } from '../FeatureRegistry/FeatureRegistry.ts'
import * as GetFeatureListVirtualDom from '../GetFeatureListVirtualDom/GetFeatureListVirtualDom.ts'
import { getFeaturesEmptyVirtualDom } from '../GetFeaturesEmptyVirtualDom/GetFeaturesEmptyVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const sash: VirtualDomNode = {
  childCount: 0,
  className: MergeClassNames.mergeClassNames(ClassNames.Sash, ClassNames.SashVertical),
  type: VirtualDomElements.Div,
}

export const getFeaturesVirtualDom = (
  features: readonly Feature[],
  selectedFeature: string,
  state: ExtensionDetailState,
): readonly VirtualDomNode[] => {
  if (features.length === 0) {
    return getFeaturesEmptyVirtualDom()
  }

  const fn = getFeatureVirtualDomHandler(selectedFeature)
  const featureVirtualDom = fn(state)

  return [
    {
      childCount: 3,
      className: ClassNames.Features,
      type: VirtualDomElements.Div,
    },
    ...GetFeatureListVirtualDom.getFeatureListVirtualDom(features),
    sash,
    ...featureVirtualDom,
  ]
}
