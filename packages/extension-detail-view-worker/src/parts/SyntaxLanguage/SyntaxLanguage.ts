export interface SyntaxLanguage {
  readonly aliases?: readonly string[]
  readonly extensions?: readonly string[]
  readonly id: string
  readonly tokenize: string
}
