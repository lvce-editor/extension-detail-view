import type { Category } from '../Category/Category.ts'
import type { Feature } from '../Feature/Feature.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'

export interface ExtensionDetailState {
  readonly assetDir: string
  readonly baseUrl: string
  readonly builtinExtensionsBadgeEnabled: boolean
  readonly categories: readonly Category[]
  readonly description: string
  readonly entries: readonly MoreInfoEntry[]
  readonly extension: any
  readonly features: readonly Feature[]
  readonly folderSize: number
  readonly iconSrc: string
  readonly name: string
  readonly platform: number
  readonly readmeScrollTop: number
  readonly resources: readonly Resource[]
  readonly sanitizedReadmeHtml: string
  readonly secondEntries: readonly MoreInfoEntry[]
  readonly selectedFeature: string
  readonly selectedFeatureMarkdownDom: string
  readonly selectedTab: string
  readonly settingsButtonEnabled: boolean
  readonly scrollToTopButtonEnabled: boolean
  readonly sizeOnDisk: number
  readonly uri: string
  readonly width: number
}
