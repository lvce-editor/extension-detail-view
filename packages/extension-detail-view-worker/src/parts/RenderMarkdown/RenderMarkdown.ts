import { renderMarkdownCached } from '../RenderMarkdownCached/RenderMarkdownCached.ts'

export const renderMarkdown = async (markdown: string, options: { readonly baseUrl?: string } = {}): Promise<string> => {
  const html = await renderMarkdownCached(markdown, options)
  return html
}
