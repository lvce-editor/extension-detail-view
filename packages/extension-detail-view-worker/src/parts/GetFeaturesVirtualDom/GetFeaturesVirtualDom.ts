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
  type: VirtualDomElements.Div,
  className: MergeClassNames.mergeClassNames(ClassNames.Sash, ClassNames.SashVertical),
  childCount: 0,
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
      type: VirtualDomElements.Div,
      className: ClassNames.Features,
      childCount: 3,
    },
    ...GetFeatureListVirtualDom.getFeatureListVirtualDom(features),
    sash,
    ...featureVirtualDom,
  ]
}
