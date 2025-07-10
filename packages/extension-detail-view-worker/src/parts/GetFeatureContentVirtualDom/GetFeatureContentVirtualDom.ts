import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureCommandsVirtualDom from '../GetFeatureCommandsVirtualDom/GetFeatureCommandsVirtualDom.ts'
import * as GetFeatureJsonValidationVirtualDom from '../GetFeatureJsonValidationVirtualDom/GetFeatureJsonValidationVirtualDom.ts'
import * as GetFeatureNotImplementedVirtualDom from '../GetFeatureNotImplementedVirtualDom/GetFeatureNotImplementedVirtualDom.ts'
import * as GetFeatureProgrammingLanguagesVirtualDom from '../GetFeatureProgrammingLanguagesVirtualDom/GetFeatureProgrammingLanguagesVirtualDom.ts'
import * as GetFeatureSettingsVirtualDom from '../GetFeatureSettingsVirtualDom/GetFeatureSettingsVirtualDom.ts'
import * as GetFeatureThemesVirtualDom from '../GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'
import * as GetFeatureWebViewsVirtualDom from '../GetFeatureWebViewsVirtualDom/GetFeatureWebViewsVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFeatureContentVirtualDom = (
  features: readonly Feature[],
  themesDom: readonly VirtualDomNode[],
  selectedFeature: string,
  extension: any,
): readonly VirtualDomNode[] => {
  switch (selectedFeature) {
    case InputName.Theme:
      return GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesDom)
    case InputName.Commands:
      return GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom(extension)
    case InputName.JsonValidation:
      return GetFeatureJsonValidationVirtualDom.getFeatureJsonValidationVirtualDom(extension)
    case InputName.ProgrammingLanguages:
      return GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom()
    case InputName.Settings:
      return GetFeatureSettingsVirtualDom.getFeatureSettingsVirtualDom(extension)
    case InputName.WebViews:
      return GetFeatureWebViewsVirtualDom.getFeatureWebViewsVirtualDom(extension)
    default:
      return GetFeatureNotImplementedVirtualDom.getFeatureNotImplementedVirtualDom()
  }
}
