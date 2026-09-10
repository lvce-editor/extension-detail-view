import type { MarkdownOptions } from '../MarkdownOptions/MarkdownOptions.ts'
import { hash } from '../Hash/Hash.ts'
import { supportsNormalCacheKey } from '../SupportsNormalCacheKey/SupportsNormalCacheKey.ts'

const getMarkdownCacheHash = async (markdown: string, options: MarkdownOptions): Promise<string> => {
  const stringifiedOptions = JSON.stringify(options)
  const contents = `${markdown}:${stringifiedOptions}:${options.commit}`
  return hash(contents)
}

export const getMarkdownCacheKey = async (markdown: string, options: MarkdownOptions): Promise<string> => {
  const hash = await getMarkdownCacheHash(markdown, options)
  const path = options.extensionId ? `/markdown/${encodeURIComponent(options.extensionId)}/${hash}` : `/markdown/${hash}`
  if (supportsNormalCacheKey(options.locationProtocol)) {
    return path
  }
  // workaround for electron bug
  return `https://-${path}`
}
