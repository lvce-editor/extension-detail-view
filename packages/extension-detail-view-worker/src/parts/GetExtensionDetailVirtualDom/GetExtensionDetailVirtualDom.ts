import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetBadge from '../GetBadge/GetBadge.ts'
import * as GetExtensionDetailButtons from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import * as GetExtensionDetailContentVirtualDom from '../GetExtensionDetailContentVirtualDom/GetExtensionDetailContentVirtualDom.ts'
import * as GetExtensionDetailHeaderVirtualDom from '../GetExtensionDetailHeaderVirtualDom/GetExtensionDetailHeaderVirtualDom.ts'
import * as GetFeatures from '../GetFeatures/GetFeatures.ts'
import * as GetTabs from '../GetTabs/GetTabs.ts'
import * as GetTabsVirtualDom from '../GetTabsVirtualDom/GetTabsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as ViewletSizeMap from '../ViewletSizeMap/ViewletSizeMap.ts'

export const getExtensionDetailVirtualDom = (
  newState: ExtensionDetailState,
  sanitizedReadmeHtml: readonly VirtualDomNode[],
  selectedTab: string,
): readonly VirtualDomNode[] => {
  // TODO move this to view model so that rendering occurs like
  // 1. state
  // 2. view model
  // 3. virtual dom
  // 4. dom
  const themesHtml = newState.themesMarkdownDom
  const selectedFeature = newState?.selectedFeature || ''
  const extension = newState?.extension || {}
  const features = GetFeatures.getFeatures(selectedFeature, extension)
  const extensionId = newState?.extension?.id || 'n/a'
  const extensionVersion = newState?.extension?.version || 'n/a'
  const { displaySize } = newState
  const width = newState?.width || 500
  const tabs: readonly Tab[] = GetTabs.getTabs(selectedTab)
  const { sizeValue } = newState
  const sizeClass = ViewletSizeMap.getClassNames(sizeValue)
  const buttonDefs = GetExtensionDetailButtons.getExtensionDetailButtons(newState.hasColorTheme, newState.isBuiltin)
  const { name, iconSrc, description } = newState
  const badge = GetBadge.getBadge(newState.isBuiltin, newState.builtinExtensionsBadgeEnabled) // TODO compute in loadContent
  const { settingsButtonEnabled } = newState
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail, sizeClass),
      childCount: 3,
    },
    ...GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(name, iconSrc, description, badge, buttonDefs, settingsButtonEnabled),
    ...GetTabsVirtualDom.getTabsVirtualDom(tabs),
    ...GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(
      sanitizedReadmeHtml,
      themesHtml,
      selectedTab,
      features,
      displaySize,
      extensionId,
      extensionVersion,
      selectedFeature,
      extension,
      width,
      newState.scrollToTopButtonEnabled,
      newState.categories,
      newState.resources,
      newState.showAdditionalDetailsBreakpoint,
    ),
  ]
  return dom
}
