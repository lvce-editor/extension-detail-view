import type { Row } from '../Row/Row.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { WebView } from '../WebView/WebView.ts'
import * as GetFeatureCommandsVirtualDom from '../GetFeatureCommandsVirtualDom/GetFeatureCommandsVirtualDom.ts'
import * as GetFeatureJsonValidationVirtualDom from '../GetFeatureJsonValidationVirtualDom/GetFeatureJsonValidationVirtualDom.ts'
import * as GetFeatureNotImplementedVirtualDom from '../GetFeatureNotImplementedVirtualDom/GetFeatureNotImplementedVirtualDom.ts'
import * as GetFeatureProgrammingLanguagesVirtualDom from '../GetFeatureProgrammingLanguagesVirtualDom/GetFeatureProgrammingLanguagesVirtualDom.ts'
import * as GetFeatureSettingsVirtualDom from '../GetFeatureSettingsVirtualDom/GetFeatureSettingsVirtualDom.ts'
import * as GetFeatureThemesVirtualDom from '../GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'
import * as GetFeatureWebViewsVirtualDom from '../GetFeatureWebViewsVirtualDom/GetFeatureWebViewsVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const getFeatureContentVirtualDom = (
  themesDom: readonly VirtualDomNode[],
  selectedFeature: string,
  commands: readonly Row[],
  jsonValidation: readonly Row[],
  settings: readonly Row[],
  webViews: readonly WebView[],
): readonly VirtualDomNode[] => {
  switch (selectedFeature) {
    case InputName.Theme:
      return GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesDom)
    case InputName.Commands:
      return GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom(commands)
    case InputName.JsonValidation:
      return GetFeatureJsonValidationVirtualDom.getFeatureJsonValidationVirtualDom(jsonValidation)
    case InputName.ProgrammingLanguages:
      return GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom()
    case InputName.Settings:
      return GetFeatureSettingsVirtualDom.getFeatureSettingsVirtualDom(settings)
    case InputName.WebViews:
      return GetFeatureWebViewsVirtualDom.getFeatureWebViewsVirtualDom(webViews)
    default:
      return GetFeatureNotImplementedVirtualDom.getFeatureNotImplementedVirtualDom()
  }
}
