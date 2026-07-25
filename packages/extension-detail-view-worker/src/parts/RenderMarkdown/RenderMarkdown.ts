import type { MarkdownOptions } from '../MarkdownOptions/MarkdownOptions.ts'
import { renderMarkdownCached } from '../RenderMarkdownCached/RenderMarkdownCached.ts'

export const renderMarkdown = async (markdown: string, options: MarkdownOptions, cacheName: string): Promise<string> => {
  const html = await renderMarkdownCached(markdown, options, cacheName)
  return html
}
