import { expect, test } from '@jest/globals'
import * as GetThemeMarkdown from '../src/parts/GetThemeMarkdown/GetThemeMarkdown.ts'
import { IconTheme } from '../src/parts/IconTheme/IconTheme.ts'
import { ProductIconTheme } from '../src/parts/ProductIconTheme/ProductIconTheme.ts'
import { Theme } from '../src/parts/Theme/Theme.ts'

test('getThemeMarkdown', () => {
  const themes: readonly Theme[] = [
    {
      label: 'A',
    },
  ]
  const iconThemes: readonly IconTheme[] = [
    {
      label: 'B',
    },
  ]
  const productIconThemes: readonly ProductIconTheme[] = [
    {
      label: 'C',
    },
  ]
  const markdown = GetThemeMarkdown.getThemeMarkdown(themes, iconThemes, productIconThemes)
  expect(markdown).toBe(`### Color Themes

- A
### File Icon Themes

- B
### Product Icon Themes

- C
`)
})
