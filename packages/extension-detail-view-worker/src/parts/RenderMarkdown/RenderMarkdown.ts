import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const renderMarkdown = async (markdown: string, options: { readonly baseUrl?: string } = {}): Promise<string> => {
  // @ts-ignore todo
  const html = await ParentRpc.invoke('Markdown.renderMarkdown', markdown, options)
  return html
}
