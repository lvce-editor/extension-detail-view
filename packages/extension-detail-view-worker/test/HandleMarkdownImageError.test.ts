import { expect, test } from '@jest/globals'
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as HandleMarkdownImageError from '../src/parts/HandleMarkdownImageError/HandleMarkdownImageError.ts'

const imageNode = {
  childCount: 0,
  onError: DomEventListenerFunctions.HandleMarkdownImageError,
  src: 'https://example.com/image.png',
  type: VirtualDomElements.Img,
}

const errorDom = [
  {
    childCount: 1,
    className: ClassNames.MarkdownImageError,
    type: VirtualDomElements.Span,
  },
  text(ExtensionDetailStrings.imageCannotBeLoaded()),
]

test('handleMarkdownImageError replaces matching details image with error text', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    detailsVirtualDom: [imageNode],
  }
  expect(HandleMarkdownImageError.handleMarkdownImageError(state, 'https://example.com/image.png')).toEqual({
    ...state,
    detailsVirtualDom: errorDom,
  })
})

test('handleMarkdownImageError preserves unrelated images', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    detailsVirtualDom: [imageNode],
  }
  expect(HandleMarkdownImageError.handleMarkdownImageError(state, 'https://example.com/other.png')).toBe(state)
})

test('handleMarkdownImageError replaces relative image after browser src normalization', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    detailsVirtualDom: [
      {
        ...imageNode,
        src: './not-found.png',
      },
    ],
  }
  expect(HandleMarkdownImageError.handleMarkdownImageError(state, 'http://localhost:3000/not-found.png')).toEqual({
    ...state,
    detailsVirtualDom: errorDom,
  })
})

test('handleMarkdownImageError is idempotent after replacement', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    detailsVirtualDom: errorDom,
  }
  expect(HandleMarkdownImageError.handleMarkdownImageError(state, 'https://example.com/image.png')).toBe(state)
})

test('handleMarkdownImageError replaces matching changelog image with error text', () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    changelogVirtualDom: [imageNode],
  }
  expect(HandleMarkdownImageError.handleMarkdownImageError(state, 'https://example.com/image.png')).toEqual({
    ...state,
    changelogVirtualDom: errorDom,
  })
})
