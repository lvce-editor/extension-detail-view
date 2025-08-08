import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetJsonSyntaxHighlightedVirtualDom from '../src/parts/GetJsonSyntaxHighlightedVirtualDom/GetJsonSyntaxHighlightedVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getJsonSyntaxHighlightedVirtualDom - simple object', () => {
  const jsonString = '{"name":"test","value":123}'
  const result = GetJsonSyntaxHighlightedVirtualDom.getJsonSyntaxHighlightedVirtualDom(jsonString)

  expect(result).toEqual([
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 },
    text('{'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonString, childCount: 1 },
    text('"name"'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 },
    text(':'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonString, childCount: 1 },
    text('"test"'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 },
    text(','),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonString, childCount: 1 },
    text('"value"'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 },
    text(':'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonNumber, childCount: 1 },
    text('123'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 },
    text('}'),
  ])
})

test('getJsonSyntaxHighlightedVirtualDom - array with mixed types', () => {
  const jsonString = '[1,"string",true,null]'
  const result = GetJsonSyntaxHighlightedVirtualDom.getJsonSyntaxHighlightedVirtualDom(jsonString)

  expect(result).toEqual([
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 },
    text('['),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonNumber, childCount: 1 },
    text('1'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 },
    text(','),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonString, childCount: 1 },
    text('"string"'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 },
    text(','),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonBoolean, childCount: 1 },
    text('true'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 },
    text(','),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonNull, childCount: 1 },
    text('null'),
    { type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 },
    text(']'),
  ])
})

test('getJsonSyntaxHighlightedVirtualDom - invalid JSON falls back to plain text', () => {
  const invalidJson = '{"invalid": json}'
  const result = GetJsonSyntaxHighlightedVirtualDom.getJsonSyntaxHighlightedVirtualDom(invalidJson)

  expect(result).toEqual([text(invalidJson)])
})

test('getJsonSyntaxHighlightedVirtualDom - nested object', () => {
  const jsonString = '{"nested":{"key":"value","number":42}}'
  const result = GetJsonSyntaxHighlightedVirtualDom.getJsonSyntaxHighlightedVirtualDom(jsonString)

  // Should contain the expected token structure
  expect(result.length).toBeGreaterThan(10)
  expect(result[0]).toEqual({ type: VirtualDomElements.Span, className: ClassNames.TokenJsonPunctuation, childCount: 1 })
  expect(result[1]).toEqual(text('{'))
})