import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as TokenToVirtualDom from '../src/parts/TokenToVirtualDom/TokenToVirtualDom.ts'

test('tokenToVirtualDom - string token', () => {
  const token = { type: 'string' as const, value: '"test"' }
  const result = TokenToVirtualDom.tokenToVirtualDom(token)

  expect(result).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.TokenJsonString,
    childCount: 1,
  })
})

test('tokenToVirtualDom - number token', () => {
  const token = { type: 'number' as const, value: '123' }
  const result = TokenToVirtualDom.tokenToVirtualDom(token)

  expect(result).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.TokenJsonNumber,
    childCount: 1,
  })
})

test('tokenToVirtualDom - boolean token', () => {
  const token = { type: 'boolean' as const, value: 'true' }
  const result = TokenToVirtualDom.tokenToVirtualDom(token)

  expect(result).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.TokenJsonBoolean,
    childCount: 1,
  })
})

test('tokenToVirtualDom - null token', () => {
  const token = { type: 'null' as const, value: 'null' }
  const result = TokenToVirtualDom.tokenToVirtualDom(token)

  expect(result).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.TokenJsonNull,
    childCount: 1,
  })
})

test('tokenToVirtualDom - punctuation token', () => {
  const token = { type: 'punctuation' as const, value: '{' }
  const result = TokenToVirtualDom.tokenToVirtualDom(token)

  expect(result).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.TokenJsonPunctuation,
    childCount: 1,
  })
})

test('tokenToVirtualDom - propertyName token (fallback)', () => {
  const token = { type: 'propertyName' as const, value: '"name"' }
  const result = TokenToVirtualDom.tokenToVirtualDom(token)

  expect(result).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.Token,
    childCount: 1,
  })
})

test('tokenToVirtualDom - propertyValue token (fallback)', () => {
  const token = { type: 'propertyValue' as const, value: '"value"' }
  const result = TokenToVirtualDom.tokenToVirtualDom(token)

  expect(result).toEqual({
    type: VirtualDomElements.Span,
    className: ClassNames.Token,
    childCount: 1,
  })
})