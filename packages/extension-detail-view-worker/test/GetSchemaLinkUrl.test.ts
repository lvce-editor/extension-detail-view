import { expect, test } from '@jest/globals'
import * as GetSchemaLinkUrl from '../src/parts/GetSchemaLinkUrl/GetSchemaLinkUrl.ts'

const EXTENSION_URI: string = 'https://example.com/extensions/sample/'

test('empty string schema returns empty string', () => {
  const schema: string = ''
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('null schema returns empty string', () => {
  const schema: any = null
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('undefined schema returns empty string', () => {
  const schema: any = undefined
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('non-string schema returns empty string', () => {
  const schema: any = 123
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('schema with leading whitespace returns empty string', () => {
  const schema: string = ' https://example.com'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('schema with trailing whitespace returns empty string', () => {
  const schema: string = 'https://example.com '
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('schema with both leading and trailing whitespace returns empty string', () => {
  const schema: string = ' https://example.com '
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('valid external https url is returned as is', () => {
  const schema: string = 'https://json.schemastore.org/package.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('https://json.schemastore.org/package.json')
})

test('valid external http url is returned as is', () => {
  const schema: string = 'http://example.com/schema.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('http://example.com/schema.json')
})

test('invalid external url with no hostname returns empty string', () => {
  const schema: string = 'https://'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('invalid external url with ftp protocol returns empty string', () => {
  const schema: string = 'ftp://example.com/schema.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('valid relative path resolves against extension uri', () => {
  const schema: string = 'schemas/package.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('https://example.com/extensions/sample/schemas/package.json')
})

test('relative path with ./ prefix resolves correctly', () => {
  const schema: string = './schemas/config.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('https://example.com/extensions/sample/schemas/config.json')
})

test('relative path with ../ prefix resolves correctly', () => {
  const schema: string = '../shared/schema.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('https://example.com/extensions/shared/schema.json')
})

test('absolute relative path with / prefix resolves correctly', () => {
  const schema: string = '/schemas/package.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('https://example.com/schemas/package.json')
})

test('relative path with file extension resolves correctly', () => {
  const schema: string = 'schema.tsconfig.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('https://example.com/extensions/sample/schema.tsconfig.json')
})

test('relative path with dots in filename is valid', () => {
  const schema: string = 'config.v2.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('https://example.com/extensions/sample/config.v2.json')
})

test('invalid schema with spaces and dots is not treated as link', () => {
  const schema: string = '... '
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('relative path with whitespace returns empty string', () => {
  const schema: string = 'schemas/package .json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('relative path with scheme separator returns empty string', () => {
  const schema: string = 'schemas://package.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('only dots returns empty string', () => {
  const schema: string = '...'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('single dot returns empty string', () => {
  const schema: string = '.'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('empty string after trimming returns empty string', () => {
  const schema: string = '   '
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('relative path with invalid characters returns empty string', () => {
  const schema: string = 'schemas/file@name.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('relative path with no alphanumeric characters returns empty string', () => {
  const schema: string = './-_-'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('relative path with only dots and slashes returns empty string', () => {
  const schema: string = './../.'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('')
})

test('valid relative path with hyphens resolves correctly', () => {
  const schema: string = 'schemas/my-schema.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('https://example.com/extensions/sample/schemas/my-schema.json')
})

test('valid relative path with underscores resolves correctly', () => {
  const schema: string = 'schemas/my_schema.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('https://example.com/extensions/sample/schemas/my_schema.json')
})

test('valid relative path with numbers resolves correctly', () => {
  const schema: string = 'schemas/v2.json'
  const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
  expect(result).toBe('https://example.com/extensions/sample/schemas/v2.json')
})
