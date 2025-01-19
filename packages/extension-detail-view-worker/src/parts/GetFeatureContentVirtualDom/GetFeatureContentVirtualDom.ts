import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureCommandsVirtualDom from '../GetFeatureCommandsVirtualDom/GetFeatureCommandsVirtualDom.ts'
import * as GetFeatureJsonValidationVirtualDom from '../GetFeatureJsonValidationVirtualDom/GetFeatureJsonValidationVirtualDom.ts'
import * as GetFeatureProgrammingLanguagesVirtualDom from '../GetFeatureProgrammingLanguagesVirtualDom/GetFeatureProgrammingLanguagesVirtualDom.ts'
import * as GetFeatureSettingsVirtualDom from '../GetFeatureSettingsVirtualDom/GetFeatureSettingsVirtualDom.ts'
import * as GetFeatureThemesVirtualDom from '../GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

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
    case InputName.JsonValidation:
      return GetFeatureJsonValidationVirtualDom.getFeatureJsonValidationVirtualDom()
    case InputName.ProgrammingLanguages:
      return GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom()
    case InputName.Settings:
      return GetFeatureSettingsVirtualDom.getFeatureSettingsVirtualDom()
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
