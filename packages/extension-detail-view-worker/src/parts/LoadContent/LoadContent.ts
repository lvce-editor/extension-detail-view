import type { Category } from '../Category/Category.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { HeaderData } from '../HeaderData/HeaderData.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { Tab } from '../Tab/Tab.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'
import { ExtensionNotFoundError } from '../ExtensionNotFoundError/ExtensionNotFoundError.ts'
import * as FeatureRegistry from '../FeatureRegistry/FeatureRegistry.ts'
import * as GetBaseUrl from '../GetBaseUrl/GetBaseUrl.ts'
import * as GetCategories from '../GetCategories/GetCategories.ts'
import * as GetDisplaySize from '../GetDisplaySize/GetDisplaySize.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import { getExtensionIdFromUri } from '../GetExtensionIdFromUri/GetExtensionIdFromUri.ts'
import * as GetFolderSize from '../GetFolderSize/GetFolderSize.ts'
import * as GetInstallationEntries from '../GetInstallationEntries/GetInstallationEntries.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetMarketplaceEntries from '../GetMarketplaceEntries/GetMarketplaceEntries.ts'
import * as GetResources from '../GetResources/GetResources.ts'
import * as GetTabs from '../GetTabs/GetTabs.ts'
import * as GetViewletSize from '../GetViewletSize/GetViewletSize.ts'
import * as InputName from '../InputName/InputName.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as LoadHeaderContent from '../LoadHeaderContent/LoadHeaderContent.ts'
import * as GetExtensionReadme from '../LoadReadmeContent/LoadReadmeContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'

export const loadContent = async (state: ExtensionDetailState, platform: number, savedState: unknown): Promise<ExtensionDetailState> => {
  const { width, uri } = state
  const id = getExtensionIdFromUri(uri)
  const extension = await ExtensionManagement.getExtension(id, platform)
  if (!extension) {
    throw new ExtensionNotFoundError(id)
  }
  const headerData: HeaderData = LoadHeaderContent.loadHeaderContent(state, platform, extension)
  const { badge, description, extensionId, extensionUri, extensionVersion, hasColorTheme, iconSrc, name } = headerData
  const readmeContent = await GetExtensionReadme.loadReadmeContent(extension.path)
  const baseUrl = GetBaseUrl.getBaseUrl(extension.path, platform)
  const readmeHtml = await RenderMarkdown.renderMarkdown(readmeContent, {
    baseUrl,
  })
  const detailsVirtualDom = await getMarkdownVirtualDom(readmeHtml, {
    scrollToTopEnabled: true,
  })
  const isBuiltin = extension?.isBuiltin
  const buttons = getExtensionDetailButtons(hasColorTheme, isBuiltin)
  const enabledButtons = buttons.filter((button) => button.enabled)
  const size = GetViewletSize.getViewletSize(width)
  const { selectedFeature, selectedTab, readmeScrollTop, changelogScrollTop } = RestoreState.restoreState(savedState)
  const features = FeatureRegistry.getFeatures(selectedFeature || InputName.Theme, extension)
  const hasFeatures = features.length > 0
  const hasReadme = true // TODO
  const hasChangelog = true // TODO
  const tabs: readonly Tab[] = GetTabs.getTabs(selectedTab, hasReadme, hasFeatures, hasChangelog)
  const enabledTabs = tabs.filter((tab) => tab.enabled)
  const folderSize = await GetFolderSize.getFolderSize(extensionUri)
  const displaySize = GetDisplaySize.getDisplaySize(folderSize)
  const installationEntries: readonly MoreInfoEntry[] = GetInstallationEntries.getInstallationEntries(
    displaySize,
    extensionId,
    extensionVersion,
    extensionUri,
  )
  const marketplaceEntries: readonly MoreInfoEntry[] = GetMarketplaceEntries.getMarketplaceEntries(isBuiltin)
  const categories: readonly Category[] = GetCategories.getCategories()
  const resources: readonly Resource[] = GetResources.getResources(isBuiltin)
  const sizeValue = GetViewletSize.getViewletSize(width || 0)
  return {
    ...state,
    badge,
    baseUrl,
    buttons: enabledButtons,
    categories,
    changelogScrollTop,
    description,
    detailsVirtualDom,
    displaySize,
    entries: installationEntries,
    extension,
    extensionId,
    extensionVersion,
    features,
    folderSize,
    hasColorTheme,
    iconSrc,
    name,
    readmeScrollTop,
    resources,
    scrollToTopButtonEnabled: true,
    secondEntries: marketplaceEntries,
    scrollSource: InputSource.Script,
    selectedTab,
    sizeOnDisk: size,
    sizeValue,
    tabs: enabledTabs,
  }
}
