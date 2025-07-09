import type { Category } from '../Category/Category.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import * as ExtensionDisplay from '../ExtensionDisplay/ExtensionDisplay.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'
import * as GetBaseUrl from '../GetBaseUrl/GetBaseUrl.ts'
import * as GetCategories from '../GetCategories/GetCategories.ts'
import * as GetDisplaySize from '../GetDisplaySize/GetDisplaySize.ts'
import * as GetEntries from '../GetEntries/GetEntries.ts'
import { getExtensionIdFromUri } from '../GetExtensionIdFromUri/GetExtensionIdFromUri.ts'
import * as GetFeatures from '../GetFeatures/GetFeatures.ts'
import * as GetFolderSize from '../GetFolderSize/GetFolderSize.ts'
import { getMarkdownVirtualDom } from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetResources from '../GetResources/GetResources.ts'
import * as GetSecondEntries from '../GetSecondEntries/GetSecondEntries.ts'
import * as GetViewletSize from '../GetViewletSize/GetViewletSize.ts'
import * as HasColorThemes from '../HasColorThemes/HasColorThemes.ts'
import * as GetExtensionReadme from '../LoadReadmeContent/LoadReadmeContent.ts'
import * as RenderMarkdown from '../RenderMarkdown/RenderMarkdown.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'

export const loadContent = async (state: ExtensionDetailState, platform: number, savedState: unknown): Promise<ExtensionDetailState> => {
  const { uri, width, assetDir } = state
  const id = getExtensionIdFromUri(uri)
  const extension = await ExtensionManagement.getExtension(id, platform)
  if (!extension) {
    throw new Error(`extension not found: ${id}`)
  }
  const readmeContent = await GetExtensionReadme.loadReadmeContent(extension.path)
  const baseUrl = GetBaseUrl.getBaseUrl(extension.path, platform)
  const readmeHtml = await RenderMarkdown.renderMarkdown(readmeContent, {
    baseUrl,
  })
  const detailsVirtualDom = await getMarkdownVirtualDom(readmeHtml)
  const iconSrc = ExtensionDisplay.getIcon(extension, platform, assetDir)
  const description = ExtensionDisplay.getDescription(extension)
  const name = ExtensionDisplay.getName(extension)
  const size = GetViewletSize.getViewletSize(width)
  const { selectedFeature, selectedTab } = RestoreState.restoreState(savedState)
  const features = GetFeatures.getFeatures(selectedFeature, extension)
  const extensionUri = extension.uri || extension.path
  const folderSize = await GetFolderSize.getFolderSize(extensionUri)
  const displaySize = GetDisplaySize.getDisplaySize(size)
  const entries: readonly MoreInfoEntry[] = GetEntries.getEntries()
  const secondEntries: readonly MoreInfoEntry[] = GetSecondEntries.getSecondEntries()
  const categories: readonly Category[] = GetCategories.getCategories()
  const resources: readonly Resource[] = GetResources.getResources()
  const sizeValue = GetViewletSize.getViewletSize(width || 0)
  const isBuiltin = extension?.builtin
  const hasColorTheme = HasColorThemes.hasColorThemes(extension)
  return {
    ...state,
    baseUrl,
    categories,
    description,
    detailsVirtualDom,
    displaySize,
    entries,
    extension,
    features,
    folderSize,
    hasColorTheme,
    iconSrc,
    isBuiltin,
    name,
    resources,
    secondEntries,
    selectedTab,
    sizeOnDisk: size,
    sizeValue,
  }
}
