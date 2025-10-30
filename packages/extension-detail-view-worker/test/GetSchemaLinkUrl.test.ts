import { expect, test } from '@jest/globals'
import * as GetSchemaLinkUrl from '../src/parts/GetSchemaLinkUrl/GetSchemaLinkUrl.ts'

const EXTENSION_URI: string = 'https://example.com/extensions/sample/'

test('invalid schema with spaces and dots is not treated as link', () => {
	const schema: string = '... '
	const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
	expect(result).toBe('')
})

test('valid external https url is returned as is', () => {
	const schema: string = 'https://json.schemastore.org/package.json'
	const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
	expect(result).toBe('https://json.schemastore.org/package.json')
})

test('valid relative path resolves against extension uri', () => {
	const schema: string = 'schemas/package.json'
	const result: string = GetSchemaLinkUrl.getSchemaLinkUrl(schema, EXTENSION_URI)
	expect(result).toBe('https://example.com/extensions/sample/schemas/package.json')
})
