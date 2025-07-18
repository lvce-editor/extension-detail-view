import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { HeaderData } from '../HeaderData/HeaderData.ts'
import type { Tab } from '../Tab/Tab.ts'
import { existsFile } from '../ExistsFile/ExistsFile.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'
import { ExtensionNotFoundError } from '../ExtensionNotFoundError/ExtensionNotFoundError.ts'
import * as FeatureRegistry from '../FeatureRegistry/FeatureRegistry.ts'
import * as GetBaseUrl from '../GetBaseUrl/GetBaseUrl.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import { getExtensionIdFromUri } from '../GetExtensionIdFromUri/GetExtensionIdFromUri.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
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
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const loadContent = async (state: ExtensionDetailState, platform: number, savedState: unknown): Promise<ExtensionDetailState> => {
  const { width, uri } = state
  const id = getExtensionIdFromUri(uri)
  const extension = await ExtensionManagement.getExtension(id, platform)
  if (!extension) {
    throw new ExtensionNotFoundError(id)
  }
  const headerData: HeaderData = LoadHeaderContent.loadHeaderContent(state, platform, extension)
  const { badge, description, extensionId, extensionUri, extensionVersion, hasColorTheme, iconSrc, name } = headerData
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
  const buttons = getExtensionDetailButtons(hasColorTheme, isBuiltin)
  const enabledButtons = buttons.filter((button) => button.enabled)
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
    installationEntries,
    extension,
    extensionId,
    extensionVersion,
    features,
    folderSize,
    hasColorTheme,
    iconSrc,
    name,
    readmeScrollTop,
    readmeUrl,
    resources,
    scrollSource: InputSource.Script,
    scrollToTopButtonEnabled: true,
    marketplaceEntries,
    selectedTab,
    sizeOnDisk: size,
    sizeValue,
    tabs: enabledTabs,
  }
}
