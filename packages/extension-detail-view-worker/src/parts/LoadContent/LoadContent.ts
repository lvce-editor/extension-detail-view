import { PlatformType } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { HeaderData } from '../HeaderData/HeaderData.ts'
import type { Tab } from '../Tab/Tab.ts'
import { existsFile } from '../ExistsFile/ExistsFile.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'
import { ExtensionNotFoundError } from '../ExtensionNotFoundError/ExtensionNotFoundError.ts'
import * as FeatureRegistry from '../FeatureRegistry/FeatureRegistry.ts'
import * as GetBaseUrl from '../GetBaseUrl/GetBaseUrl.ts'
import { getColorThemeId, getColorThemeLabel } from '../GetColorThemeId/GetColorThemeId.ts'
import { getCommit } from '../GetCommit/GetCommit.ts'
import { getCurrentColorTheme } from '../GetCurrentColorThemeId/GetCurrentColorThemeId.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import { getExtensionIdFromUri } from '../GetExtensionIdFromUri/GetExtensionIdFromUri.ts'
import { getExtensionUri } from '../GetExtensionUri/GetExtensionUri.ts'
import { getGithubRepository } from '../GetGithubRepository/GetGithubRepository.ts'
import { getLinkProtectionEnabled } from '../GetLinkProtectionEnabled/GetLinkProtectionEnabled.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import { getPadding, getSideBarWidth } from '../GetPadding/GetPadding.ts'
import { getSyntaxLanguages } from '../GetSyntaxLanguages/GetSyntaxLanguages.ts'
import * as GetTabs from '../GetTabs/GetTabs.ts'
import * as GetViewletSize from '../GetViewletSize/GetViewletSize.ts'
import * as InputName from '../InputName/InputName.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as LoadHeaderContent from '../LoadHeaderContent/LoadHeaderContent.ts'
import * as GetExtensionReadme from '../LoadReadmeContent/LoadReadmeContent.ts'
import { loadSideBarContent } from '../LoadSideBarContent/LoadSideBarContent.ts'
import * as ParseCreated from '../ParseCreated/ParseCreated.ts'
import * as ParseLastUpdated from '../ParseLastUpdated/ParseLastUpdated.ts'
import * as Path from '../Path/Path.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'

const isEnabled = (tab: Tab): boolean => {
  return tab.enabled
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
  const { uri, width } = state
  const id = getExtensionIdFromUri(uri)
  const extension = await ExtensionManagement.getExtension(id, platform)
  if (!extension) {
    throw new ExtensionNotFoundError(id)
  }
  const currentColorThemeId = await getCurrentColorTheme()
  const commit = await getCommit()
  const languages = await getSyntaxLanguages(platform, state.assetDir)
  const headerData: HeaderData = LoadHeaderContent.loadHeaderContent(state, platform, extension)
  const {
    badge,
    description,
    downloadCount,
    extensionId,
    extensionUri: unresolvedExtensionUri,
    extensionVersion,
    hasColorTheme,
    iconSrc,
    name,
    rating,
  } = headerData
  const extensionUri = getExtensionUri(unresolvedExtensionUri, platform, location.origin)
  const readmeUrl = Path.join(extensionUri, 'README.md')
  const changelogUrl = Path.join(extensionUri, 'CHANGELOG.md')
  const [hasReadme, hasChangelog] = await Promise.all([existsFile(readmeUrl), existsFile(changelogUrl)])
  const readmeContent = hasReadme ? await GetExtensionReadme.loadReadmeContent(readmeUrl) : ExtensionDetailStrings.noReadmeFound()
  const baseUrl = GetBaseUrl.getBaseUrl(extension.path, platform)
  // TODO maybe pass these as arguments also
  const locationProtocol = location.protocol
  const locationHost = location.host

  const readmeHtml = await RenderMarkdown.renderMarkdown(readmeContent, {
    baseUrl,
    commit,
    languages,
    linksExternal: true,
    locationProtocol,
  })
  const detailsVirtualDom = await getMarkdownVirtualDom(readmeHtml, {
    scrollToTopEnabled: true,
  })
  const isBuiltin = extension?.isBuiltin || extension?.builtin || false
  const disabled = extension?.disabled
  const extensionColorThemeId = getColorThemeId(extension) || ''
  const extensionColorThemeLabel = getColorThemeLabel(extension) || ''
  const buttons = getExtensionDetailButtons(hasColorTheme, isBuiltin, disabled, extensionColorThemeId, extensionColorThemeLabel, currentColorThemeId)
  const size = GetViewletSize.getViewletSize(width)
  const { changelogScrollTop, readmeScrollTop, selectedFeature, selectedTab } = RestoreState.restoreState(savedState)
  const features = FeatureRegistry.getFeatures(selectedFeature || InputName.Theme, extension)
  const hasFeatures = features.length > 0
  const hasGithubReleases = Boolean(getGithubRepository(extension))
  const tabs: readonly Tab[] = GetTabs.getTabs(selectedTab, hasReadme, hasFeatures, hasChangelog || hasGithubReleases)
  const enabledTabs = tabs.filter(isEnabled)
  const sizeValue = GetViewletSize.getViewletSize(width || 0)
  const showSizeLink = platform !== PlatformType.Web
  const created = ParseCreated.parseCreated(extension)
  const lastUpdated = ParseLastUpdated.parseLastUpdated(extension)
  const { categories, displaySize, folderSize, installationEntries, marketplaceEntries, resources } = await loadSideBarContent(
    extensionId,
    extensionVersion,
    extensionUri,
    isBuiltin,
    extension,
    showSizeLink,
    created,
    lastUpdated,
  )
  const padding = getPadding(width)
  const sideBarWidth = getSideBarWidth(width)
  const showSideBar = sideBarWidth > 0
  const linkProtectionEnabled = await getLinkProtectionEnabled()
  return {
    ...state,
    badge,
    baseUrl,
    buttons,
    categories,
    changelogScrollTop,
    commit,
    created,
    currentColorThemeId,
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
    initial: false,
    installationEntries,
    languages,
    lastUpdated,
    linkProtectionEnabled,
    locationHost,
    locationProtocol,
    marketplaceEntries,
    name,
    paddingLeft: padding,
    paddingRight: padding,
    platform,
    rating,
    readmeScrollTop,
    readmeUrl,
    resources,
    scrollSource: InputSource.Script,
    scrollToTopButtonEnabled: true,
    selectedTab,
    showSideBar,
    showSizeLink,
    sideBarWidth,
    sizeOnDisk: size,
    sizeValue,
    tabs: enabledTabs,
  }
}
