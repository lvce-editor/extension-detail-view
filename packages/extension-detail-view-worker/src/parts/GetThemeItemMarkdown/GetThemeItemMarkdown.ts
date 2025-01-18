import type { ElementWithLabel } from '../ElementWithLabel/ElementWithLabel.ts'

export const getThemeItemMarkdown = (heading: string, items: readonly ElementWithLabel[]): string => {
  let markdown = ''
  if (items.length > 0) {
    markdown += `### ${heading}`
    markdown += '\n\n'
    for (const item of items) {
      markdown += `- ${item.label}`
      markdown += '\n'
    }
  }
  return markdown
}
