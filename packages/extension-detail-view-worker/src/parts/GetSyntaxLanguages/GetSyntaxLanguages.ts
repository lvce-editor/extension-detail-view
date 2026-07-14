import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import type { SyntaxLanguage } from '../SyntaxLanguage/SyntaxLanguage.ts'

const getStringArray = (value: unknown): readonly string[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined
  }
  return value.filter((item): item is string => typeof item === 'string')
}

const toSyntaxLanguage = (value: unknown): SyntaxLanguage | undefined => {
  if (!value || typeof value !== 'object') {
    return undefined
  }
  const language = value as Record<string, unknown>
  if (typeof language.id !== 'string' || typeof language.tokenize !== 'string') {
    return undefined
  }
  return {
    aliases: getStringArray(language.aliases),
    extensions: getStringArray(language.extensions),
    id: language.id,
    tokenize: language.tokenize,
  }
}

export const getSyntaxLanguages = async (platform: number, assetDir: string): Promise<readonly SyntaxLanguage[]> => {
  try {
    const languages = await ExtensionManagementWorker.getLanguages(platform, assetDir)
    if (!Array.isArray(languages)) {
      return []
    }
    return languages.flatMap((language) => {
      const syntaxLanguage = toSyntaxLanguage(language)
      return syntaxLanguage ? [syntaxLanguage] : []
    })
  } catch {
    return []
  }
}
