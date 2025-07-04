import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetDisplaySize from '../GetDisplaySize/GetDisplaySize.ts'
import * as GetExtensionDetailContentVirtualDom from '../GetExtensionDetailContentVirtualDom/GetExtensionDetailContentVirtualDom.ts'
import * as GetExtensionDetailHeaderVirtualDom from '../GetExtensionDetailHeaderVirtualDom/GetExtensionDetailHeaderVirtualDom.ts'
import * as GetFeatures from '../GetFeatures/GetFeatures.ts'
import * as GetTabs from '../GetTabs/GetTabs.ts'
import * as GetTabsVirtualDom from '../GetTabsVirtualDom/GetTabsVirtualDom.ts'
import * as GetViewletSize from '../GetViewletSize/GetViewletSize.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as ViewletSizeMap from '../ViewletSizeMap/ViewletSizeMap.ts'

export const getExtensionDetailVirtualDom = async (
  extensionDetail: any,
  sanitizedReadmeHtml: string,
  selectedTab: string,
  newState: any,
): Promise<readonly VirtualDomNode[]> => {
  // TODO move this to view model so that rendering occurs like
  // 1. state
  // 2. view model
  // 3. virtual dom
  // 4. dom
  const themesHtml = newState?.selectedFeatureMarkdownDom || ''
  const selectedFeature = newState?.selectedFeature || ''
  const extension = newState?.extension || {}
  const features = GetFeatures.getFeatures(selectedFeature, extension)
  const size = newState.folderSize || 0
  const extensionId = newState?.extension?.id || 'n/a'
  const extensionVersion = newState?.extension?.version || 'n/a'
  const displaySize = GetDisplaySize.getDisplaySize(size)
  const width = newState?.width || 500
  const tabs: readonly Tab[] = GetTabs.getTabs(selectedTab)
  const sizeValue = GetViewletSize.getViewletSize(newState?.width || 0)
  const sizeClass = ViewletSizeMap.getClassNames(sizeValue)
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail, sizeClass),
      childCount: 3,
    },
    ...GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(extensionDetail),
    ...GetTabsVirtualDom.getTabsVirtualDom(tabs),
    ...(await GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(
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
    )),
  ]
  return dom
}
