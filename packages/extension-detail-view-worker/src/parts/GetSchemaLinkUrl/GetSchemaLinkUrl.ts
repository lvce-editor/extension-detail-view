const isExternalLink = (schema: string): boolean => {
  return schema.startsWith('http://') || schema.startsWith('https://')
}

export const getSchemaLinkUrl = (schema: string, extensionUri: string): string => {
  if (!schema) {
    return ''
  }
  if (isExternalLink(schema)) {
    return schema
  }
  return new URL(schema, extensionUri).toString()
}
