import type { Category } from '../Category/Category.ts'
import type { Feature } from '../Feature/Feature.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { Row } from '../Row/Row.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { WebView } from '../WebView/WebView.ts'

export interface ExtensionDetailState {
  readonly assetDir: string
  readonly baseUrl: string
  readonly builtinExtensionsBadgeEnabled: boolean
  readonly categories: readonly Category[]
  readonly changelogVirtualDom: readonly VirtualDomNode[]
  readonly description: string
  readonly detailsVirtualDom: readonly VirtualDomNode[]
  readonly displaySize: string
  readonly entries: readonly MoreInfoEntry[]
  readonly extension: any
  readonly features: readonly Feature[]
  readonly featuresVirtualDom: readonly VirtualDomNode[]
  readonly folderSize: number
  readonly hasColorTheme: boolean
  readonly iconSrc: string
  readonly isBuiltin: boolean
  readonly jsonValidation: readonly Row[]
  readonly name: string
  readonly platform: number
  readonly readmeScrollTop: number
  readonly resources: readonly Resource[]
  readonly scrollToTopButtonEnabled: boolean
  readonly secondEntries: readonly MoreInfoEntry[]
  readonly selectedFeature: string
  readonly selectedTab: string
  readonly settingsButtonEnabled: boolean
  readonly showAdditionalDetailsBreakpoint: number
  readonly sizeOnDisk: number
  readonly sizeValue: number
  readonly themesMarkdownDom: readonly VirtualDomNode[]
  readonly uri: string
  readonly webViews: readonly WebView[]
  readonly width: number
}
