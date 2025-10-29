import type { MarkdownOptions } from '../MarkdownOptions/MarkdownOptions.ts'
import { renderMarkdownCached } from '../RenderMarkdownCached/RenderMarkdownCached.ts'

export const renderMarkdown = async (markdown: string, options: MarkdownOptions = {}): Promise<string> => {
  const html = await renderMarkdownCached(markdown, options)
  return html
}
