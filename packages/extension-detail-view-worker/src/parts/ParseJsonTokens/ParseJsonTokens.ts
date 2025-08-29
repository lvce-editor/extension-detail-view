import type { JsonToken } from '../JsonToken/JsonToken.ts'

export const parseJsonTokens = (jsonString: string): readonly JsonToken[] => {
  const tokens: JsonToken[] = []
  let i = 0
  let depth = 0
  let inString = false
  let stringStart = 0
  let currentString = ''

  while (i < jsonString.length) {
    const char = jsonString[i]

    if (inString) {
      if (char === '"' && jsonString[i - 1] !== '\\') {
        // End of string
        inString = false
        currentString += char
        tokens.push({
          type: 'string',
          value: currentString,
        })
        currentString = ''
      } else {
        currentString += char
      }
    } else {
      if (char === '"') {
        // Start of string
        inString = true
        stringStart = i
        currentString = char
      } else if (char === '{' || char === '}' || char === '[' || char === ']' || char === ':' || char === ',') {
        // Punctuation
        tokens.push({
          type: 'punctuation',
          value: char,
        })
        if (char === '{' || char === '[') {
          depth++
        } else if (char === '}' || char === ']') {
          depth--
        }
      } else if (char === 't' && jsonString.slice(i, i + 4) === 'true') {
        // Boolean true
        tokens.push({
          type: 'boolean',
          value: 'true',
        })
        i += 3
      } else if (char === 'f' && jsonString.slice(i, i + 5) === 'false') {
        // Boolean false
        tokens.push({
          type: 'boolean',
          value: 'false',
        })
        i += 4
      } else if (char === 'n' && jsonString.slice(i, i + 4) === 'null') {
        // Null
        tokens.push({
          type: 'null',
          value: 'null',
        })
        i += 3
      } else if (/[0-9]/.test(char)) {
        // Number
        let number = char
        i++
        while (i < jsonString.length && /[0-9.]/.test(jsonString[i])) {
          number += jsonString[i]
          i++
        }
        i--
        tokens.push({
          type: 'number',
          value: number,
        })
      } else if (!/\s/.test(char)) {
        // Any other non-whitespace character (fallback)
        tokens.push({
          type: 'string',
          value: char,
        })
      }
    }
    i++
  }

  return tokens
}
