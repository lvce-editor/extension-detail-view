import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'

export interface ExtensionDetailState {
  readonly selectedTab: string
  readonly selectedFeature: string
  readonly sanitizedReadmeHtml: string
  readonly iconSrc: string
  readonly name: string
  readonly description: string
  readonly size: number
  readonly width: number
  readonly uri: string
  readonly selectedFeatureMarkdown: string
  readonly entries: readonly MoreInfoEntry[]
  readonly secondEntries: readonly MoreInfoEntry[]
  readonly categories: readonly Category[]
  readonly resources: readonly Resource[]
}
