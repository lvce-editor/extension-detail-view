import * as GetThemeMarkdown from '../src/parts/GetThemeMarkdown/GetThemeMarkdown.ts'

test('getThemeMarkdown', () => {
  const themes = [
    {
      label: 'A',
    },
  ]
  const iconThemes = [
    {
      label: 'B',
    },
  ]
  const productIconThemes = [
    {
      label: 'C',
    },
  ]
  const markdown = GetThemeMarkdown.getThemeMarkdown(themes, iconsThems, productIconThemes)
})
