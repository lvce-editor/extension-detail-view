import type { ActivationEntry } from '../ActivationEntry/ActivationEntry.ts'
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
  readonly activationEntries: readonly ActivationEntry[]
  readonly activationEvents: readonly string[]
  readonly activationTime: number
  readonly assetDir: string
  readonly badge: string
  readonly baseUrl: string
  readonly builtinExtensionsBadgeEnabled: boolean
  readonly buttons: readonly ExtensionDetailButton[]
  readonly categories: readonly Category[]
  readonly changelogScrollTop: number
  readonly changelogVirtualDom: readonly VirtualDomNode[]
  readonly commands: readonly Row[]
  readonly commit: string
  readonly description: string
  readonly detailsVirtualDom: readonly VirtualDomNode[]
  readonly disabled: boolean // TODO change to management status number or multiple properties: disabled, builtin, linked, fromMarketPlace, deprecated, malicious
  readonly displaySize: string
  readonly downloadCount: string
  readonly extension: any
  readonly extensionId: string
  readonly extensionUri: string
  readonly extensionVersion: string
  readonly features: readonly Feature[]
  readonly featuresVirtualDom: readonly VirtualDomNode[]
  readonly focus: number
  readonly folderSize: number
  readonly hasColorTheme: boolean
  readonly hasReadme: boolean
  readonly iconSrc: string
  readonly importTime: number
  readonly installationEntries: readonly MoreInfoEntry[]
  readonly jsonValidation: readonly Row[]
  readonly locationHost: string
  readonly locationProtocol: string
  readonly marketplaceEntries: readonly MoreInfoEntry[]
  readonly name: string
  readonly paddingLeft: number
  readonly paddingRight: number
  readonly platform: number
  readonly programmingLanguages: readonly Row[]
  readonly rating: string
  readonly readmeScrollTop: number
  readonly readmeUrl: string
  readonly resources: readonly Resource[]
  readonly scrollSource: number
  readonly scrollToTopButtonEnabled: boolean
  readonly selectedFeature: string
  readonly selectedTab: string
  readonly settings: readonly Row[]
  readonly settingsButtonEnabled: boolean
  readonly showAdditionalDetailsBreakpoint: number
  readonly showSideBar: boolean
  readonly showSizeLink: boolean
  readonly sideBarWidth: number
  readonly sizeOnDisk: number
  readonly sizeValue: number
  readonly status: number
  readonly tabs: readonly Tab[]
  readonly themesMarkdownDom: readonly VirtualDomNode[]
  readonly uid: number
  readonly uri: string
  readonly wasActivatedByEvent: string
  readonly webViews: readonly WebView[]
  readonly width: number
}
