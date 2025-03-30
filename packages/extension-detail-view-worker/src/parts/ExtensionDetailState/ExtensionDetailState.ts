import type { Category } from '../Category/Category.ts'
import type { Feature } from '../Feature/Feature.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'

export interface ExtensionDetailState {
  readonly selectedTab: string
  readonly selectedFeature: string
  readonly sanitizedReadmeHtml: string
  readonly iconSrc: string
  readonly name: string
  readonly description: string
  readonly sizeOnDisk: number
  readonly width: number
  readonly uri: string
  readonly selectedFeatureMarkdownDom: string
  readonly entries: readonly MoreInfoEntry[]
  readonly secondEntries: readonly MoreInfoEntry[]
  readonly categories: readonly Category[]
  readonly resources: readonly Resource[]
  readonly extension: any
  readonly baseUrl: string
  readonly features: readonly Feature[]
  readonly folderSize: number
  readonly assetDir: string
  readonly platform: number
}
