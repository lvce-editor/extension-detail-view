import type { JsonToken } from '../JsonToken/JsonToken.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getTokenClassName = (token: JsonToken): string => {
  switch (token.type) {
    case 'string':
      return ClassNames.TokenJsonString
    case 'number':
      return ClassNames.TokenJsonNumber
    case 'boolean':
      return ClassNames.TokenJsonBoolean
    case 'null':
      return ClassNames.TokenJsonNull
    case 'punctuation':
      return ClassNames.TokenJsonPunctuation
    default:
      return ClassNames.Token
  }
} 