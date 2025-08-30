import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { HeaderData } from '../HeaderData/HeaderData.ts'
import type { Tab } from '../Tab/Tab.ts'
import { existsFile } from '../ExistsFile/ExistsFile.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'
import { ExtensionNotFoundError } from '../ExtensionNotFoundError/ExtensionNotFoundError.ts'
import * as FeatureRegistry from '../FeatureRegistry/FeatureRegistry.ts'
import * as GetBaseUrl from '../GetBaseUrl/GetBaseUrl.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import { getExtensionIdFromUri } from '../GetExtensionIdFromUri/GetExtensionIdFromUri.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import { getPadding, getSideBarWidth } from '../GetPadding/GetPadding.ts'
import * as GetTabs from '../GetTabs/GetTabs.ts'
import * as GetViewletSize from '../GetViewletSize/GetViewletSize.ts'
import * as InputName from '../InputName/InputName.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as LoadHeaderContent from '../LoadHeaderContent/LoadHeaderContent.ts'
import * as GetExtensionReadme from '../LoadReadmeContent/LoadReadmeContent.ts'
import { loadSideBarContent } from '../LoadSideBarContent/LoadSideBarContent.ts'
import * as Path from '../Path/Path.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'
import { ExtensionDetailButton } from '../GetExtensionDetailButtons/ExtensionDetailButton.ts'

const isEnabled = (button: ExtensionDetailButton): boolean => {
  return button.enabled
}

export const loadContent = async (
  state: ExtensionDetailState,
  platform: number,
  savedState: unknown,
  isTest: boolean = false,
): Promise<ExtensionDetailState> => {
  if (isTest) {
    savedState = undefined
  }
  const { width, uri } = state
  const id = getExtensionIdFromUri(uri)
  const extension = await ExtensionManagement.getExtension(id, platform)
  if (!extension) {
    throw new ExtensionNotFoundError(id)
  }
  const headerData: HeaderData = LoadHeaderContent.loadHeaderContent(state, platform, extension)
  const { badge, description, downloadCount, extensionId, extensionUri, extensionVersion, hasColorTheme, iconSrc, name, rating } = headerData
  const readmeUrl = Path.join(extensionUri, 'README.md')
  const changelogUrl = Path.join(extensionUri, 'CHANGELOG.md')
  const [hasReadme, hasChangelog] = await Promise.all([existsFile(readmeUrl), existsFile(changelogUrl)])
  const readmeContent = hasReadme ? await GetExtensionReadme.loadReadmeContent(readmeUrl) : ExtensionDetailStrings.noReadmeFound()
  const baseUrl = GetBaseUrl.getBaseUrl(extension.path, platform)
  const readmeHtml = await RenderMarkdown.renderMarkdown(readmeContent, {
    baseUrl,
  })
  const detailsVirtualDom = await getMarkdownVirtualDom(readmeHtml, {
    scrollToTopEnabled: true,
  })
  const isBuiltin = extension?.isBuiltin
  const disabled = extension?.disabled
  const buttons = getExtensionDetailButtons(hasColorTheme, isBuiltin, disabled)
  const enabledButtons = buttons.filter(isEnabled)
  const size = GetViewletSize.getViewletSize(width)
  const { selectedFeature, selectedTab, readmeScrollTop, changelogScrollTop } = RestoreState.restoreState(savedState)
  const features = FeatureRegistry.getFeatures(selectedFeature || InputName.Theme, extension)
  const hasFeatures = features.length > 0
  const tabs: readonly Tab[] = GetTabs.getTabs(selectedTab, hasReadme, hasFeatures, hasChangelog)
  const enabledTabs = tabs.filter((tab) => tab.enabled)
  const sizeValue = GetViewletSize.getViewletSize(width || 0)
  const { installationEntries, marketplaceEntries, displaySize, categories, resources, folderSize } = await loadSideBarContent(
    extensionId,
    extensionVersion,
    extensionUri,
    isBuiltin,
  )
  const padding = getPadding(width)
  const sideBarWidth = getSideBarWidth(width)
  const showSideBar = sideBarWidth > 0
  return {
    ...state,
    badge,
    baseUrl,
    buttons: enabledButtons,
    categories,
    changelogScrollTop,
    description,
    detailsVirtualDom,
    disabled,
    displaySize,
    downloadCount,
    extension,
    extensionId,
    extensionUri,
    extensionVersion,
    features,
    folderSize,
    hasColorTheme,
    hasReadme,
    iconSrc,
    installationEntries,
    marketplaceEntries,
    name,
    paddingLeft: padding,
    paddingRight: padding,
    rating,
    readmeScrollTop,
    readmeUrl,
    resources,
    scrollSource: InputSource.Script,
    scrollToTopButtonEnabled: true,
    selectedTab,
    showSideBar,
    sideBarWidth,
    sizeOnDisk: size,
    sizeValue,
    tabs: enabledTabs,
  }
}
