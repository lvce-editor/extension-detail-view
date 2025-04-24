import type { Category } from '../Category/Category.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import * as ExtensionDisplay from '../ExtensionDisplay/ExtensionDisplay.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'
import * as GetBaseUrl from '../GetBaseUrl/GetBaseUrl.ts'
import { getExtensionIdFromUri } from '../GetExtensionIdFromUri/GetExtensionIdFromUri.ts'
import * as GetFeatures from '../GetFeatures/GetFeatures.ts'
import * as GetFolderSize from '../GetFolderSize/GetFolderSize.ts'
import * as GetViewletSize from '../GetViewletSize/GetViewletSize.ts'
import * as GetExtensionReadme from '../LoadReadmeContent/LoadReadmeContent.ts'
import * as MarkDown from '../RenderMarkdown/RenderMarkdown.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'

export const loadContent = async (state: ExtensionDetailState, platform: number, savedState: unknown): Promise<ExtensionDetailState> => {
  const { uri, width, assetDir } = state
  const id = getExtensionIdFromUri(uri)
  const extension = await ExtensionManagement.getExtension(id, platform)
  const readmeContent = await GetExtensionReadme.loadReadmeContent(extension.path)
  const baseUrl = GetBaseUrl.getBaseUrl(extension.path, platform)
  const readmeHtml = await MarkDown.renderMarkdown(readmeContent, {
    baseUrl,
  })
  const sanitizedReadmeHtml = readmeHtml
  const normalizedReadmeHtml = sanitizedReadmeHtml
  const iconSrc = ExtensionDisplay.getIcon(extension, platform, assetDir)
  const description = ExtensionDisplay.getDescription(extension)
  const name = ExtensionDisplay.getName(extension)
  const size = GetViewletSize.getViewletSize(width)
  const { selectedFeature, selectedTab } = RestoreState.restoreState(savedState)
  const features = GetFeatures.getFeatures(selectedFeature, extension)
  const folderSize = await GetFolderSize.getFolderSize(extension.uri)
  const entries: readonly MoreInfoEntry[] = [
    {
      key: 'Identifier',
      value: 'abc',
    },
    {
      key: 'Version',
      value: '1.9.5',
    },
    {
      key: 'Last Updated',
      value: 'n/a',
    },
  ]
  const secondEntries: readonly MoreInfoEntry[] = [
    {
      key: 'Published',
      value: 'n/a',
    },
    {
      key: 'Last Released',
      value: 'n/a',
    },
  ]
  const categories: readonly Category[] = [
    {
      id: 'themes',
      label: 'Themes',
    },
  ]
  const resources: readonly Resource[] = [
    {
      label: 'Marketplace',
      url: '#',
    },
    {
      label: 'Issues',
      url: '#',
    },
    {
      label: 'Repository',
      url: '#',
    },
    {
      label: 'License',
      url: '#',
    },
  ]

  return {
    ...state,
    selectedTab,
    sanitizedReadmeHtml: normalizedReadmeHtml,
    iconSrc,
    name,
    description,
    sizeOnDisk: size,
    entries,
    secondEntries,
    categories,
    resources,
    extension,
    baseUrl,
    features,
    folderSize,
  }
}
