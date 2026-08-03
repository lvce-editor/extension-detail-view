import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as FeatureThemeDetails from '../src/parts/FeatureThemeDetails/FeatureThemeDetails.ts'

test('returns color theme details', async () => {
  const extension = {
    colorThemes: [{ label: 'Dark', path: 'themes/dark.json' }],
  }

  const result = await FeatureThemeDetails.getThemeDetails(extension, '', '', '')

  expect(result.themesMarkdownDom).toContainEqual({
    childCount: 1,
    href: '#',
    name: 'themes/dark.json',
    rel: 'noopener noreferrer',
    style: 'color: var(--LinkForeground, #3794ff)',
    target: '_blank',
    title: 'themes/dark.json',
    type: VirtualDomElements.A,
  })
})

test('handles empty themes', async () => {
  const result = await FeatureThemeDetails.getThemeDetails({}, '', '', '')

  expect(result.themesMarkdownDom).toEqual([])
})
