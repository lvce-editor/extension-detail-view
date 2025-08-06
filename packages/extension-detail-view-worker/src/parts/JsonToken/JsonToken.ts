export interface JsonToken {
  readonly type: 'string' | 'number' | 'boolean' | 'null' | 'punctuation' | 'propertyName' | 'propertyValue'
  readonly value: string
} 