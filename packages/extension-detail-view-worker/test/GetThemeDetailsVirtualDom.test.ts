import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getThemeDetailsVirtualDom } from '../src/parts/GetThemeDetailsVirtualDom/GetThemeDetailsVirtualDom.ts'

test('renders color theme links and plain icon theme labels', () => {
  const result = getThemeDetailsVirtualDom(
    [{ label: 'Dark', path: 'themes/dark.json' }, { label: 'Theme without path' }],
    [{ label: 'File Icons' }],
    [{ label: 'Product Icons' }],
  )

  expect(result).toContainEqual({
    childCount: 1,
    href: '#',
    name: 'themes/dark.json',
    rel: 'noopener noreferrer',
    target: '_blank',
    title: 'themes/dark.json',
    type: VirtualDomElements.A,
  })
  expect(result).toContainEqual({ childCount: 0, text: 'Theme without path', type: VirtualDomElements.Text })
  expect(result).toContainEqual({ childCount: 0, text: 'File Icons', type: VirtualDomElements.Text })
  expect(result).toContainEqual({ childCount: 0, text: 'Product Icons', type: VirtualDomElements.Text })
})

test('omits empty sections', () => {
  expect(getThemeDetailsVirtualDom([], [], [])).toEqual([])
})
