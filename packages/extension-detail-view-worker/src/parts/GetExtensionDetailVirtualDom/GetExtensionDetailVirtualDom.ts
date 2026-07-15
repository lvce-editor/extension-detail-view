import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetExtensionDetailContentVirtualDom from '../GetExtensionDetailContentVirtualDom/GetExtensionDetailContentVirtualDom.ts'
import { getExtensionDetailErrorVirtualDom } from '../GetExtensionDetailErrorVirtualDom/GetExtensionDetailErrorVirtualDom.ts'
import * as GetExtensionDetailHeaderVirtualDom from '../GetExtensionDetailHeaderVirtualDom/GetExtensionDetailHeaderVirtualDom.ts'
import * as GetTabsVirtualDom from '../GetTabsVirtualDom/GetTabsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as ViewletSizeMap from '../ViewletSizeMap/ViewletSizeMap.ts'

export const getExtensionDetailVirtualDom = (newState: ExtensionDetailState, selectedTab: string): readonly VirtualDomNode[] => {
  if (newState.errorMessage) {
    return getExtensionDetailErrorVirtualDom(newState.errorTitle, newState.errorMessage)
  }
  // TODO move this to view model so that rendering occurs like
  // 1. state
  // 2. view model
  // 3. virtual dom
  // 4. dom
  const {
    badge,
    buttons,
    categories,
    changelogVirtualDom,
    description,
    detailsVirtualDom,
    downloadCount,
    focusedTabIndex,
    iconSrc,
    name,
    rating,
    resources,
    scrollToTopButtonEnabled,
    settingsButtonEnabled,
    showAdditionalDetailsBreakpoint,
    sizeValue,
    tabs,
  } = newState

  const width = newState?.width || 500
  const sizeClass = ViewletSizeMap.getClassNames(sizeValue)
  const dom = [
    {
      childCount: 3,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail, sizeClass),
      type: VirtualDomElements.Div,
    },
    ...GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(
      name,
      iconSrc,
      description,
      badge,
      buttons,
      settingsButtonEnabled,
      downloadCount,
      rating,
    ),
    ...GetTabsVirtualDom.getTabsVirtualDom(tabs, focusedTabIndex),
    ...GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(
      detailsVirtualDom,
      selectedTab,
      width,
      scrollToTopButtonEnabled,
      categories,
      resources,
      showAdditionalDetailsBreakpoint,
      changelogVirtualDom,
      newState,
    ),
  ]
  return dom
}
