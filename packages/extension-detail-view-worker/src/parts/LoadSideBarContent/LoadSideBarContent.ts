import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import * as GetCategories from '../GetCategories/GetCategories.ts'
import * as GetDisplaySize from '../GetDisplaySize/GetDisplaySize.ts'
import * as GetFolderSize from '../GetFolderSize/GetFolderSize.ts'
import * as GetInstallationEntries from '../GetInstallationEntries/GetInstallationEntries.ts'
import * as GetMarketplaceEntries from '../GetMarketplaceEntries/GetMarketplaceEntries.ts'
import * as GetResources from '../GetResources/GetResources.ts'

export interface SideBarContent {
  readonly categories: readonly Category[]
  readonly displaySize: string
  readonly folderSize: number
  readonly installationEntries: readonly MoreInfoEntry[]
  readonly marketplaceEntries: readonly MoreInfoEntry[]
  readonly resources: readonly Resource[]
}

export const loadSideBarContent = async (
  extensionId: string,
  extensionVersion: string,
  extensionUri: string,
  isBuiltin: boolean,
  extension: unknown,
  showSizeLink: boolean,
): Promise<SideBarContent> => {
  const folderSize = await GetFolderSize.getFolderSize(extensionUri)
  const displaySize = GetDisplaySize.getDisplaySize(folderSize)
  const installationEntries: readonly MoreInfoEntry[] = GetInstallationEntries.getInstallationEntries(
    displaySize,
    extensionId,
    extensionVersion,
    extensionUri,
    showSizeLink,
  )
  const marketplaceEntries: readonly MoreInfoEntry[] = GetMarketplaceEntries.getMarketplaceEntries(isBuiltin)
  const categories: readonly Category[] = GetCategories.getCategories(extension)
  const resources: readonly Resource[] = GetResources.getResources(isBuiltin, extension)
  return {
    categories,
    displaySize,
    folderSize,
    installationEntries,
    marketplaceEntries,
    resources,
  }
}
