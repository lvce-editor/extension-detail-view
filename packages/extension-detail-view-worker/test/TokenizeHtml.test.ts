import { expect, test } from '@jest/globals'
import * as TokenizeHtml from '../src/parts/TokenizeHtml/TokenizeHtml.ts'
import * as TokenType from '../src/parts/HtmlTokenType/HtmlTokenType.ts'
import { UnexpectedTokenError } from '../src/parts/UnexpectedTokenError/UnexpectedTokenError.ts'

test('plain text', () => {
  expect(TokenizeHtml.tokenizeHtml('Hello World')).toEqual([
    {
      type: TokenType.Content,
      text: 'Hello World',
    },
  ])
})

test('simple tag', () => {
  expect(TokenizeHtml.tokenizeHtml('<div>')).toEqual([
    {
      type: TokenType.OpeningAngleBracket,
      text: '<',
    },
    {
      type: TokenType.TagNameStart,
      text: 'div',
    },
    {
      type: TokenType.ClosingAngleBracket,
      text: '>',
    },
  ])
})

test('closing tag', () => {
  expect(TokenizeHtml.tokenizeHtml('</div>')).toEqual([
    {
      type: TokenType.OpeningAngleBracket,
      text: '<',
    },
    {
      type: TokenType.ClosingTagSlash,
      text: '/',
    },
    {
      type: TokenType.TagNameEnd,
      text: 'div',
    },
    {
      type: TokenType.ClosingAngleBracket,
      text: '>',
    },
  ])
})

test('tag with attribute', () => {
  expect(TokenizeHtml.tokenizeHtml('<div class="test">')).toEqual([
    {
      type: TokenType.OpeningAngleBracket,
      text: '<',
    },
    {
      type: TokenType.TagNameStart,
      text: 'div',
    },
    {
      type: TokenType.WhitespaceInsideOpeningTag,
      text: ' ',
    },
    {
      type: TokenType.AttributeName,
      text: 'class',
    },
    {
      type: TokenType.AttributeEqualSign,
      text: '=',
    },
    {
      type: TokenType.AttributeQuoteStart,
      text: '"',
    },
    {
      type: TokenType.AttributeValue,
      text: 'test',
    },
    {
      type: TokenType.AttributeQuoteEnd,
      text: '"',
    },
    {
      type: TokenType.ClosingAngleBracket,
      text: '>',
    },
  ])
})

test('comment', () => {
  expect(TokenizeHtml.tokenizeHtml('<!-- test -->')).toEqual([
    {
      type: TokenType.CommentStart,
      text: '<!--',
    },
    {
      type: TokenType.Comment,
      text: ' test ',
    },
    {
      type: TokenType.EndCommentTag,
      text: '-->',
    },
  ])
})

test('self closing tag', () => {
  expect(TokenizeHtml.tokenizeHtml('<img/>')).toEqual([
    {
      type: TokenType.OpeningAngleBracket,
      text: '<',
    },
    {
      type: TokenType.TagNameStart,
      text: 'img',
    },
    {
      type: TokenType.ClosingAngleBracket,
      text: '/>',
    },
  ])
})

test('throws on invalid token', () => {
  expect(() => TokenizeHtml.tokenizeHtml('<@>')).toThrow(UnexpectedTokenError)
})

test('tag with multiple attributes', () => {
  expect(TokenizeHtml.tokenizeHtml('<img src="test.png" alt="test">')).toEqual([
    {
      type: TokenType.OpeningAngleBracket,
      text: '<',
    },
    {
      type: TokenType.TagNameStart,
      text: 'img',
    },
    {
      type: TokenType.WhitespaceInsideOpeningTag,
      text: ' ',
    },
    {
      type: TokenType.AttributeName,
      text: 'src',
    },
    {
      type: TokenType.AttributeEqualSign,
      text: '=',
    },
    {
      type: TokenType.AttributeQuoteStart,
      text: '"',
    },
    {
      type: TokenType.AttributeValue,
      text: 'test.png',
    },
    {
      type: TokenType.AttributeQuoteEnd,
      text: '"',
    },
    {
      type: TokenType.WhitespaceInsideOpeningTag,
      text: ' ',
    },
    {
      type: TokenType.AttributeName,
      text: 'alt',
    },
    {
      type: TokenType.AttributeEqualSign,
      text: '=',
    },
    {
      type: TokenType.AttributeQuoteStart,
      text: '"',
    },
    {
      type: TokenType.AttributeValue,
      text: 'test',
    },
    {
      type: TokenType.AttributeQuoteEnd,
      text: '"',
    },
    {
      type: TokenType.ClosingAngleBracket,
      text: '>',
    },
  ])
})
