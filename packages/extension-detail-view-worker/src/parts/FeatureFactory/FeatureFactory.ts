import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as FeatureActivationEventsDetails from '../FeatureActivationEventsDetails/FeatureActivationEventsDetails.ts'
import * as FeatureActivationEventsEnabled from '../FeatureActivationEventsEnabled/FeatureActivationEventsEnabled.ts'
import * as FeatureActivationEventsVirtualDom from '../FeatureActivationEventsVirtualDom/FeatureActivationEventsVirtualDom.ts'
import * as FeatureCommandsDetails from '../FeatureCommandsDetails/FeatureCommandsDetails.ts'
import * as FeatureCommandsEnabled from '../FeatureCommandsEnabled/FeatureCommandsEnabled.ts'
import * as FeatureCommandsVirtualDom from '../FeatureCommandsVirtualDom/FeatureCommandsVirtualDom.ts'
import * as FeatureJsonValidationDetails from '../FeatureJsonValidationDetails/FeatureJsonValidationDetails.ts'
import * as FeatureJsonValidationEnabled from '../FeatureJsonValidationEnabled/FeatureJsonValidationEnabled.ts'
import * as FeatureJsonValidationVirtualDom from '../FeatureJsonValidationVirtualDom/FeatureJsonValidationVirtualDom.ts'
import * as FeatureProgrammingLanguagesDetails from '../FeatureProgrammingLanguagesDetails/FeatureProgrammingLanguagesDetails.ts'
import * as FeatureProgrammingLanguagesEnabled from '../FeatureProgrammingLanguagesEnabled/FeatureProgrammingLanguagesEnabled.ts'
import * as FeatureProgrammingLanguagesVirtualDom from '../FeatureProgrammingLanguagesVirtualDom/FeatureProgrammingLanguagesVirtualDom.ts'
import { register } from '../FeatureRegistry/FeatureRegistry.ts'
import * as FeatureRuntimeStatusDetails from '../FeatureRuntimeStatusDetails/FeatureRuntimeStatusDetails.ts'
import * as FeatureRuntimeStatusEnabled from '../FeatureRuntimeStatusEnabled/FeatureRuntimeStatusEnabled.ts'
import * as FeatureRuntimeStatusVirtualDom from '../FeatureRuntimeStatusVirtualDom/FeatureRuntimeStatusVirtualDom.ts'
import * as FeatureSettingsDetails from '../FeatureSettingsDetails/FeatureSettingsDetails.ts'
import * as FeatureSettingsEnabled from '../FeatureSettingsEnabled/FeatureSettingsEnabled.ts'
import * as FeatureSettingsVirtualDom from '../FeatureSettingsVirtualDom/FeatureSettingsVirtualDom.ts'
import * as FeatureThemeDetails from '../FeatureThemeDetails/FeatureThemeDetails.ts'
import * as FeatureThemeEnabled from '../FeatureThemeEnabled/FeatureThemeEnabled.ts'
import * as FeatureThemeVirtualDom from '../FeatureThemeVirtualDom/FeatureThemeVirtualDom.ts'
import * as FeatureWebViewsDetails from '../FeatureWebViewsDetails/FeatureWebViewsDetails.ts'
import * as FeatureWebViewsEnabled from '../FeatureWebViewsEnabled/FeatureWebViewsEnabled.ts'
import * as FeatureWebViewsVirtualDom from '../FeatureWebViewsVirtualDom/FeatureWebViewsVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const registerAllFeatures = (): void => {
  register({
    getDetails: FeatureThemeDetails.getThemeDetails,
    getLabel: ExtensionDetailStrings.theme,
    getVirtualDom: FeatureThemeVirtualDom.getThemeVirtualDom,
    id: InputName.Theme,
    isEnabled: FeatureThemeEnabled.featureThemeEnabled,
  })
  register({
    getDetails: FeatureCommandsDetails.getCommandsDetails,
    getLabel: ExtensionDetailStrings.commands,
    getVirtualDom: FeatureCommandsVirtualDom.getCommandsVirtualDom,
    id: InputName.Commands,
    isEnabled: FeatureCommandsEnabled.featureCommandsEnabled,
  })
  register({
    getDetails: FeatureSettingsDetails.getSettingsDetails,
    getLabel: ExtensionDetailStrings.settings,
    getVirtualDom: FeatureSettingsVirtualDom.getSettingsVirtualDom,
    id: InputName.Settings,
    isEnabled: FeatureSettingsEnabled.featureSettingsEnabled,
  })
  register({
    getDetails: FeatureJsonValidationDetails.getJsonValidationDetails,
    getLabel: ExtensionDetailStrings.jsonValidation,
    getVirtualDom: FeatureJsonValidationVirtualDom.getJsonValidationVirtualDom,
    id: InputName.JsonValidation,
    isEnabled: FeatureJsonValidationEnabled.featureJsonValidationEnabled,
  })
  register({
    getDetails: FeatureProgrammingLanguagesDetails.getFeatureDetailsProgrammingLanguages,
    getLabel: ExtensionDetailStrings.programmingLanguages,
    getVirtualDom: FeatureProgrammingLanguagesVirtualDom.getProgrammingLanguagesVirtualDom,
    id: InputName.ProgrammingLanguages,
    isEnabled: FeatureProgrammingLanguagesEnabled.featureProgrammingLanguagesEnabled,
  })
  register({
    getDetails: FeatureWebViewsDetails.getWebViewsDetails,
    getLabel: ExtensionDetailStrings.webViews,
    getVirtualDom: FeatureWebViewsVirtualDom.getWebViewsVirtualDom,
    id: InputName.WebViews,
    isEnabled: FeatureWebViewsEnabled.featureWebViewsEnabled,
  })
  register({
    getDetails: FeatureActivationEventsDetails.getActivationEventsDetails,
    getLabel: ExtensionDetailStrings.activationEvents,
    getVirtualDom: FeatureActivationEventsVirtualDom.getActivationEventsVirtualDom,
    id: InputName.ActivationEvents,
    isEnabled: FeatureActivationEventsEnabled.featureActivationEventsEnabled,
  })
  register({
    getDetails: FeatureRuntimeStatusDetails.getRuntimeStatusDetails,
    getLabel: ExtensionDetailStrings.runtimeStatus,
    getVirtualDom: FeatureRuntimeStatusVirtualDom.getRuntimeStatusVirtualDom,
    id: InputName.RuntimeStatus,
    isEnabled: FeatureRuntimeStatusEnabled.featureRuntimeStatusEnabled,
  })
}
