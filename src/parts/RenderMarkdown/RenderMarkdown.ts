import * as marked from 'marked'

export const renderMarkdown = async (markdown: string, { baseUrl = '' } = {}) => {
  const html = await marked.marked(markdown, {})
  return html
}
