import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Feature } from '../Feature/Feature.ts'
import type { Row } from '../Row/Row.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { WebView } from '../WebView/WebView.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentVirtualDom from '../GetFeatureContentVirtualDom/GetFeatureContentVirtualDom.ts'
import * as GetFeatureListVirtualDom from '../GetFeatureListVirtualDom/GetFeatureListVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeaturesVirtualDom = (
  features: readonly Feature[],
  themesDom: readonly VirtualDomNode[],
  selectedFeature: string,
  commands: readonly Row[],
  jsonValidation: readonly Row[],
  settings: readonly Row[],
  webViews: readonly WebView[],
  activationEvents: readonly string[],
): readonly VirtualDomNode[] => {
  if (features.length === 0) {
    const none = ExtensionDetailStrings.none()
    return [
      {
        type: VirtualDomElements.Div,
        className: ClassNames.Features,
        childCount: 3,
      },
      text(none),
    ]
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Features,
      childCount: 3,
    },
    ...GetFeatureListVirtualDom.getFeatureListVirtualDom(features),
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Sash, ClassNames.SashVertical),
      childCount: 0,
    },
    ...GetFeatureContentVirtualDom.getFeatureContentVirtualDom(
      themesDom,
      selectedFeature,
      commands,
      jsonValidation,
      settings,
      webViews,
      activationEvents,
    ),
  ]
}
