import type { Category } from '../Category/Category.ts'
import type { Feature } from '../Feature/Feature.ts'
import type { ExtensionDetailButton } from '../GetExtensionDetailButtons/ExtensionDetailButton.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { Row } from '../Row/Row.ts'
import type { Tab } from '../Tab/Tab.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { WebView } from '../WebView/WebView.ts'

export interface ExtensionDetailState {
  readonly activationEvents: readonly string[]
  readonly assetDir: string
  readonly badge: string
  readonly baseUrl: string
  readonly builtinExtensionsBadgeEnabled: boolean
  readonly buttons: readonly ExtensionDetailButton[]
  readonly categories: readonly Category[]
  readonly changelogScrollTop: number
  readonly changelogVirtualDom: readonly VirtualDomNode[]
  readonly commands: readonly Row[]
  readonly description: string
  readonly detailsVirtualDom: readonly VirtualDomNode[]
  readonly displaySize: string
  readonly installationEntries: readonly MoreInfoEntry[]
  readonly extension: any
  readonly extensionId: string
  readonly extensionVersion: string
  readonly features: readonly Feature[]
  readonly featuresVirtualDom: readonly VirtualDomNode[]
  readonly focus: number
  readonly folderSize: number
  readonly hasColorTheme: boolean
  readonly iconSrc: string
  readonly jsonValidation: readonly Row[]
  readonly name: string
  readonly platform: number
  readonly programmingLanguages: readonly Row[]
  readonly readmeScrollTop: number
  readonly resources: readonly Resource[]
  readonly scrollSource: number
  readonly scrollToTopButtonEnabled: boolean
  readonly marketplaceEntries: readonly MoreInfoEntry[]
  readonly selectedFeature: string
  readonly selectedTab: string
  readonly settings: readonly Row[]
  readonly settingsButtonEnabled: boolean
  readonly showAdditionalDetailsBreakpoint: number
  readonly sizeOnDisk: number
  readonly sizeValue: number
  readonly tabs: readonly Tab[]
  readonly themesMarkdownDom: readonly VirtualDomNode[]
  readonly uid: number
  readonly uri: string
  readonly webViews: readonly WebView[]
  readonly width: number
  readonly readmeUrl: string
}
