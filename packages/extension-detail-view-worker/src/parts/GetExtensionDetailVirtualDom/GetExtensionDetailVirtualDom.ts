import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetExtensionDetailContentVirtualDom from '../GetExtensionDetailContentVirtualDom/GetExtensionDetailContentVirtualDom.ts'
import * as GetExtensionDetailHeaderVirtualDom from '../GetExtensionDetailHeaderVirtualDom/GetExtensionDetailHeaderVirtualDom.ts'
import * as GetTabs from '../GetTabs/GetTabs.ts'
import * as GetTabsVirtualDom from '../GetTabsVirtualDom/GetTabsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as ViewletSizeMap from '../ViewletSizeMap/ViewletSizeMap.ts'

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
    iconSrc,
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
    buttons,
  } = newState
  const extensionUri = extension.uri || extension.path || ''

  const width = newState?.width || 500
  const tabs: readonly Tab[] = GetTabs.getTabs(selectedTab)
  const sizeClass = ViewletSizeMap.getClassNames(sizeValue)
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail, sizeClass),
      childCount: 3,
    },
    ...GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(name, iconSrc, description, badge, buttons, settingsButtonEnabled),
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
