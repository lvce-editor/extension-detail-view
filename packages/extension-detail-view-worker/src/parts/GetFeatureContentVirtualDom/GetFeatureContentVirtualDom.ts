import type { Feature } from '../Feature/Feature.ts'
import * as GetFeatureCommandsVirtualDom from '../GetFeatureCommandsVirtualDom/GetFeatureCommandsVirtualDom.ts'
import * as GetFeatureThemesVirtualDom from '../GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getFeatureContentVirtualDom = (
  features: readonly Feature[],
  themesHtml: string,
  selectedFeature: string,
  extension: any,
): readonly VirtualDomNode[] => {
  switch (selectedFeature) {
    case InputName.Theme:
      return GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesHtml)
    case InputName.Commands:
      return GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom()
    default:
      return [
        {
          type: VirtualDomElements.Div,
          className: 'FeatureContent',
          childCount: 1,
        },
        text('Not Implemented'),
      ]
  }
}
