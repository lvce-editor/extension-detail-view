const isExternalLink = (schema: string): boolean => {
  return schema.startsWith('http://') || schema.startsWith('https://')
}

const hasWhitespace = (value: string): boolean => {
  return /\s/.test(value)
}

const isOnlyDotsOrEmpty = (value: string): boolean => {
  const trimmed = value.trim()
  return trimmed === '' || /^\.*$/.test(trimmed)
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
  if (!/^[./]?[A-Za-z0-9._\-/]+$/.test(value)) {
    return false
  }
  // Must contain at least one alphanumeric character
  if (!/[A-Za-z0-9]/.test(value)) {
    return false
  }
  return true
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
    return new URL(schema, extensionUri).toString()
  } catch {
    return ''
  }
}
