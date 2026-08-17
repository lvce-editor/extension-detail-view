import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as ReplaceMarkdownImageWithError from '../src/parts/ReplaceMarkdownImageWithError/ReplaceMarkdownImageWithError.ts'

test('preserves image children when replacing image with error', () => {
  const trailingText = text('\n')
  const dom = [
    {
      childCount: 1,
      className: ClassNames.Markdown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      src: './not-found.png',
      type: VirtualDomElements.Img,
    },
    trailingText,
  ]

  expect(ReplaceMarkdownImageWithError.replaceMarkdownImageWithError(dom, './not-found.png')).toEqual([
    dom[0],
    {
      childCount: 2,
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: ClassNames.MarkdownImageError,
      type: VirtualDomElements.Span,
    },
    text(ExtensionDetailStrings.imageCannotBeLoaded()),
    trailingText,
  ])
})

test('uses Gitpod-specific error text for a Gitpod image', () => {
  const src = 'https://gitpod.io/button/open-in-gitpod.svg'
  const dom = [
    {
      childCount: 0,
      src,
      type: VirtualDomElements.Img,
    },
  ]

  expect(ReplaceMarkdownImageWithError.replaceMarkdownImageWithError(dom, src)).toEqual([
    {
      childCount: 1,
      className: ClassNames.MarkdownImageError,
      type: VirtualDomElements.Span,
    },
    text(ExtensionDetailStrings.gitpodImageFailedToLoad()),
  ])
})
