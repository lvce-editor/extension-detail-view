import type { MarkdownOptions } from '../MarkdownOptions/MarkdownOptions.ts'
import * as GetMarkdownCacheKey from '../GetMarkdownCacheKey/GetMarkdownCacheKey.ts'
import { hash } from '../Hash/Hash.ts'
import * as MarkDownCache from '../MarkDownCache/MarkDownCache.ts'
import * as MarkdownWorker from '../MarkdownWorker/MarkdownWorker.ts'

export const renderMarkdownCached = async (markdown: string, options: MarkdownOptions = {}): Promise<string> => {
  const markdownHash = await hash(markdown) // TODO hash options also
  const cacheKey = GetMarkdownCacheKey.getMarkdownCacheKey(markdownHash)
  const hasItem = await MarkDownCache.has(cacheKey)
  if (hasItem) {
    const value = await MarkDownCache.get(cacheKey)
    return value // TODO validate if it's valid
  }
  const html = await MarkdownWorker.render(markdown, options)
  await MarkDownCache.set(cacheKey, html)
  return html
}
