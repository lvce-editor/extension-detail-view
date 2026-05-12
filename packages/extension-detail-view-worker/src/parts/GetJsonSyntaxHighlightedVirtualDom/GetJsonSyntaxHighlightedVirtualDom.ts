import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ParseJsonTokens from '../ParseJsonTokens/ParseJsonTokens.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { JsonToken } from '../JsonToken/JsonToken.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getTokenClassName = (token: JsonToken): string => {
  switch (token.type) {
    case 'boolean':
      return ClassNames.TokenJsonBoolean
    case 'null':
      return ClassNames.TokenJsonNull
    case 'number':
      return ClassNames.TokenJsonNumber
    case 'punctuation':
      return ClassNames.TokenJsonPunctuation
    case 'string':
      return ClassNames.TokenJsonString
    default:
      return ClassNames.Token
  }
}

const tokenToVirtualDom = (token: JsonToken): VirtualDomNode => {
  return {
    childCount: 1,
    className: getTokenClassName(token),
    type: VirtualDomElements.Span,
  }
}

export const getJsonSyntaxHighlightedVirtualDom = (jsonString: string): readonly VirtualDomNode[] => {
  try {
    JSON.parse(jsonString)
    const tokens = ParseJsonTokens.parseJsonTokens(jsonString)
    const result: VirtualDomNode[] = []

    for (const token of tokens) {
      result.push(tokenToVirtualDom(token))
      result.push(text(token.value))
    }

    return result
  } catch {
    return [text(jsonString)]
  }
}
