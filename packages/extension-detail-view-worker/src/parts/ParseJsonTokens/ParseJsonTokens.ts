import type { JsonToken } from '../JsonToken/JsonToken.ts'

const isDigit = (char: string): boolean => {
  return /\d/.test(char)
}

const isNumberCharacter = (char: string): boolean => {
  return /[\d.]/.test(char)
}

const isWhitespace = (char: string): boolean => {
  return /\s/.test(char)
}

const isPunctuation = (char: string): boolean => {
  return char === '{' || char === '}' || char === '[' || char === ']' || char === ':' || char === ','
}

const getKeywordMatch = (jsonString: string, index: number): { readonly token: JsonToken; readonly nextIndex: number } | undefined => {
  if (jsonString.startsWith('true', index)) {
    return {
      nextIndex: index + 3,
      token: {
        type: 'boolean',
        value: 'true',
      },
    }
  }
  if (jsonString.startsWith('false', index)) {
    return {
      nextIndex: index + 4,
      token: {
        type: 'boolean',
        value: 'false',
      },
    }
  }
  if (jsonString.startsWith('null', index)) {
    return {
      nextIndex: index + 3,
      token: {
        type: 'null',
        value: 'null',
      },
    }
  }
  return undefined
}

const getStringToken = (jsonString: string, index: number): { readonly token: JsonToken; readonly nextIndex: number } => {
  let value = '"'
  let currentIndex = index + 1
  while (currentIndex < jsonString.length) {
    const char = jsonString[currentIndex]
    value += char
    if (char === '"' && jsonString[currentIndex - 1] !== '\\') {
      return {
        nextIndex: currentIndex,
        token: {
          type: 'string',
          value,
        },
      }
    }
    currentIndex++
  }
  return {
    nextIndex: currentIndex,
    token: {
      type: 'string',
      value,
    },
  }
}

const getNumberToken = (jsonString: string, index: number): { readonly token: JsonToken; readonly nextIndex: number } => {
  let value = jsonString[index]
  let currentIndex = index + 1
  while (currentIndex < jsonString.length && isNumberCharacter(jsonString[currentIndex])) {
    value += jsonString[currentIndex]
    currentIndex++
  }
  return {
    nextIndex: currentIndex - 1,
    token: {
      type: 'number',
      value,
    },
  }
}

export const parseJsonTokens = (jsonString: string): readonly JsonToken[] => {
  const tokens: JsonToken[] = []
  let i = 0
  while (i < jsonString.length) {
    const char = jsonString[i]

    if (char === '"') {
      const stringToken = getStringToken(jsonString, i)
      tokens.push(stringToken.token)
      i = stringToken.nextIndex
      i++
      continue
    }

    if (isPunctuation(char)) {
      tokens.push({
        type: 'punctuation',
        value: char,
      })
      i++
      continue
    }

    const keywordMatch = getKeywordMatch(jsonString, i)
    if (keywordMatch) {
      tokens.push(keywordMatch.token)
      i = keywordMatch.nextIndex
      i++
      continue
    }

    if (isDigit(char)) {
      const numberToken = getNumberToken(jsonString, i)
      tokens.push(numberToken.token)
      i = numberToken.nextIndex
      i++
      continue
    }

    if (!isWhitespace(char)) {
      tokens.push({
        type: 'string',
        value: char,
      })
    }
    i++
  }

  return tokens
}
