import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetDisplaySize from '../GetDisplaySize/GetDisplaySize.ts'
import * as GetExtensionDetailContentVirtualDom from '../GetExtensionDetailContentVirtualDom/GetExtensionDetailContentVirtualDom.ts'
import * as GetExtensionDetailHeaderVirtualDom from '../GetExtensionDetailHeaderVirtualDom/GetExtensionDetailHeaderVirtualDom.ts'
import * as GetFeatures from '../GetFeatures/GetFeatures.ts'
import * as GetTabs from '../GetTabs/GetTabs.ts'
import * as GetTabsVirtualDom from '../GetTabsVirtualDom/GetTabsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getExtensionDetailVirtualDom = (
  extensionDetail: any,
  sanitizedReadmeHtml: string,
  selectedTab: string,
  newState: any,
): readonly VirtualDomNode[] => {
  // TODO move this to view model so that rendering occurs like
  // 1. state
  // 2. view model
  // 3. virtual dom
  // 4. dom
  const themesHtml = newState?.selectedFeatureMarkdownDom || ''
  const selectedFeature = newState?.selectedFeature || ''
  const features = newState?.features || GetFeatures.getFeatures(selectedFeature)
  const size = newState.folderSize || 0
  const extensionId = newState?.extension?.id || 'n/a'
  const extensionVersion = newState?.extension?.version || 'n/a'
  const extension = newState?.extension || {}
  const displaySize = GetDisplaySize.getDisplaySize(size)
  const tabs: readonly Tab[] = GetTabs.getTabs(selectedTab)
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail),
      childCount: 3,
    },
    ...GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(extensionDetail),
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
    ),
  ]
  return dom
}
