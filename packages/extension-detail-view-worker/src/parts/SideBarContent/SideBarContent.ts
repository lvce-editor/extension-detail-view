import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'

export interface SideBarContent {
  readonly categories: readonly Category[]
  readonly displaySize: string
  readonly folderSize: number
  readonly installationEntries: readonly MoreInfoEntry[]
  readonly marketplaceEntries: readonly MoreInfoEntry[]
  readonly resources: readonly Resource[]
}
