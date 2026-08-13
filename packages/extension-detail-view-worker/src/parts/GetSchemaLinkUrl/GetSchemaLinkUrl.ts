const isExternalLink = (schema: string): boolean => {
  return schema.startsWith('http://') || schema.startsWith('https://')
}

const isAlphanumeric = (char: string): boolean => {
  const code = char.codePointAt(0) || 0
  return (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
}

const hasWhitespace = (value: string): boolean => {
  for (const char of value) {
    if (char.trim() === '') {
      return true
    }
  }
  return false
}

const isOnlyDotsOrEmpty = (value: string): boolean => {
  const trimmed = value.trim()
  for (const char of trimmed) {
    if (char !== '.') {
      return false
    }
  }
  return true
}

const isValidHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value)
    return (url.protocol === 'http:' || url.protocol === 'https:') && !!url.hostname
  } catch {
    return false
  }
}

const isValidRelativePath = (value: string): boolean => {
  // Disallow schemes and whitespace
  if (hasWhitespace(value)) {
    return false
  }
  if (value.includes('://')) {
    return false
  }
  if (isOnlyDotsOrEmpty(value)) {
    return false
  }
  // Allow paths like ./a.json, ../a.json, /a.json, schemas/a.json, a/b.json
  let hasAlphanumeric = false
  for (const char of value) {
    if (!isAlphanumeric(char) && char !== '.' && char !== '_' && char !== '-' && char !== '/') {
      return false
    }
    if (isAlphanumeric(char)) {
      hasAlphanumeric = true
    }
  }
  // Must contain at least one alphanumeric character
  return hasAlphanumeric
}

export const getSchemaLinkUrl = (schema: string, extensionUri: string): string => {
  if (!schema || typeof schema !== 'string') {
    return ''
  }
  const trimmed = schema.trim()
  if (trimmed !== schema) {
    return ''
  }
  if (isExternalLink(schema)) {
    return isValidHttpUrl(schema) ? schema : ''
  }
  if (!isValidRelativePath(schema)) {
    return ''
  }
  try {
    const baseUrl = extensionUri.endsWith('/') ? extensionUri : `${extensionUri}/`
    return new URL(schema, baseUrl).href
  } catch {
    return ''
  }
}
