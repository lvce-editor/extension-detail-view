import type { JsonToken } from '../JsonToken/JsonToken.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getTokenClassName = (token: JsonToken): string => {
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
