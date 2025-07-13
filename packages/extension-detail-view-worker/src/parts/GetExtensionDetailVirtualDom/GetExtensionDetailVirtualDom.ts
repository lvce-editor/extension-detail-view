import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as GetExtensionDetailButtons from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import * as GetExtensionDetailContentVirtualDom from '../GetExtensionDetailContentVirtualDom/GetExtensionDetailContentVirtualDom.ts'
import * as GetExtensionDetailHeaderVirtualDom from '../GetExtensionDetailHeaderVirtualDom/GetExtensionDetailHeaderVirtualDom.ts'
import * as GetTabs from '../GetTabs/GetTabs.ts'
import * as GetTabsVirtualDom from '../GetTabsVirtualDom/GetTabsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import type { Tab } from '../Tab/Tab.ts'
import * as ViewletSizeMap from '../ViewletSizeMap/ViewletSizeMap.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getExtensionDetailVirtualDom = (newState: ExtensionDetailState, selectedTab: string): readonly VirtualDomNode[] => {
  // TODO move this to view model so that rendering occurs like
  // 1. state
  // 2. view model
  // 3. virtual dom
  // 4. dom
  const {
    activationEvents,
    categories,
    changelogVirtualDom,
    commands,
    description,
    detailsVirtualDom,
    displaySize,
    extension,
    extensionId,
    extensionVersion,
    features,
    hasColorTheme,
    iconSrc,
    isBuiltin,
    jsonValidation,
    name,
    resources,
    scrollToTopButtonEnabled,
    selectedFeature,
    settings,
    settingsButtonEnabled,
    showAdditionalDetailsBreakpoint,
    sizeValue,
    themesMarkdownDom,
    webViews,
    badge,
  } = newState
  const extensionUri = extension.uri || extension.path || ''

  const width = newState?.width || 500
  const tabs: readonly Tab[] = GetTabs.getTabs(selectedTab)
  const sizeClass = ViewletSizeMap.getClassNames(sizeValue)
  const buttonDefs = GetExtensionDetailButtons.getExtensionDetailButtons(hasColorTheme, isBuiltin) // TODO compute in loadContent
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail, sizeClass),
      childCount: 3,
    },
    ...GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(name, iconSrc, description, badge, buttonDefs, settingsButtonEnabled),
    ...GetTabsVirtualDom.getTabsVirtualDom(tabs),
    ...GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(
      detailsVirtualDom,
      themesMarkdownDom,
      selectedTab,
      features,
      displaySize,
      extensionId,
      extensionVersion,
      selectedFeature,
      width,
      scrollToTopButtonEnabled,
      categories,
      resources,
      showAdditionalDetailsBreakpoint,
      commands,
      jsonValidation,
      settings,
      webViews,
      extensionUri,
      changelogVirtualDom,
      activationEvents,
      newState,
    ),
  ]
  return dom
}
