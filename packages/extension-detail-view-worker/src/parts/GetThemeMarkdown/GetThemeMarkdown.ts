import type { IconTheme } from '../IconTheme/IconTheme.ts'
import type { ProductIconTheme } from '../ProductIconTheme/ProductIconTheme.ts'
import type { Theme } from '../Theme/Theme.ts'
import * as GetThemeItemMarkdown from '../GetThemeItemMarkdown/GetThemeItemMarkdown.ts'

const getColorThemeMarkdown = (themes: readonly Theme[]): string => {
  const heading = 'Color Themes'
  return GetThemeItemMarkdown.getThemeItemMarkdown(heading, themes)
}

const getIconThemeMarkdown = (iconThemes: readonly IconTheme[]): string => {
  const heading = 'File Icon Themes'
  return GetThemeItemMarkdown.getThemeItemMarkdown(heading, iconThemes)
}

const getProductIconThemeMarkdown = (iconThemes: readonly ProductIconTheme[]): string => {
  const heading = 'Product Icon Themes'
  return GetThemeItemMarkdown.getThemeItemMarkdown(heading, iconThemes)
}

export const getThemeMarkdown = (
  themes: readonly Theme[],
  iconThemes: readonly IconTheme[],
  productIconThemes: readonly ProductIconTheme[],
): string => {
  let markdown = ''
  markdown += getColorThemeMarkdown(themes)
  markdown += getIconThemeMarkdown(iconThemes)
  markdown += getProductIconThemeMarkdown(productIconThemes)
  return markdown
}
