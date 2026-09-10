import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetMarkdownImageErrorVirtualDom from '../src/parts/GetMarkdownImageErrorVirtualDom/GetMarkdownImageErrorVirtualDom.ts'

test('shows an icon and original image URL as text', () => {
  const src = 'https://example.com/<image>.png?size=2&theme=dark'
  expect(GetMarkdownImageErrorVirtualDom.getMarkdownImageErrorVirtualDom(src)).toEqual([
    { childCount: 2, className: 'MarkdownImageError', type: VirtualDomElements.Span },
    { childCount: 0, className: 'MaskIcon MaskIconWarning', type: VirtualDomElements.Span },
    text(`Image cannot be loaded: ${src}`),
  ])
})

test.each([undefined, null, 42, ''])('handles a missing image source: %p', (src) => {
  expect(GetMarkdownImageErrorVirtualDom.getMarkdownImageErrorVirtualDom(src).at(-1)).toEqual(text('Image cannot be loaded'))
})
