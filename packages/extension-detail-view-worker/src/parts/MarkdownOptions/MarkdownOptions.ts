import type { SyntaxLanguage } from '../SyntaxLanguage/SyntaxLanguage.ts'

export interface MarkdownOptions {
  readonly baseUrl?: string
  readonly commit?: string
  readonly languages?: readonly SyntaxLanguage[]
  readonly linksExternal?: boolean
  readonly locationProtocol: string
}
