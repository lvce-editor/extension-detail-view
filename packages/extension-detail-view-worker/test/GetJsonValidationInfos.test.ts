import { expect, jest, test, beforeEach } from '@jest/globals'
import type { JsonValidationInfo } from '../src/parts/GetJsonValidationInfos/GetJsonValidationInfos.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getJsonValidationInfos } from '../src/parts/GetJsonValidationInfos/GetJsonValidationInfos.ts'

let mockFetch: jest.MockedFunction<typeof fetch>

beforeEach(() => {
  mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
  globalThis.fetch = mockFetch
})

test('returns empty array when validations is empty', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const validations: readonly any[] = []

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toEqual([])
})

test('handles validation with non-string schema', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const validations: readonly any[] = [
    {
      fileMatch: '*.json',
      schema: { invalid: 'object' },
    },
  ]

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
    fileMatch: '*.json',
    isValid: false,
    schemaUrl: '',
    stringValue: JSON.stringify({ invalid: 'object' }),
  })
})

test('handles validation with invalid link', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const validations: readonly any[] = [
    {
      fileMatch: '*.json',
      schema: 'invalid link with spaces',
    },
  ]

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    errorMessage: ExtensionDetailStrings.invalidLink(),
    fileMatch: '*.json',
    isValid: false,
    schemaUrl: '',
    stringValue: 'invalid link with spaces',
  })
})

test('handles validation with valid external schema that exists', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const schemaUrl: string = 'https://json.schemastore.org/package.json'
  const validations: readonly any[] = [
    {
      fileMatch: '*.json',
      schema: schemaUrl,
    },
  ]

  mockFetch.mockResolvedValueOnce({
    ok: true,
  } as Response)

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    errorMessage: '',
    fileMatch: '*.json',
    isValid: true,
    schemaUrl: schemaUrl,
    stringValue: schemaUrl,
  })
  expect(mockFetch).toHaveBeenCalledWith(schemaUrl, { method: 'HEAD' })
})

test('handles validation with valid external schema that does not exist', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const schemaUrl: string = 'https://example.com/nonexistent.json'
  const validations: readonly any[] = [
    {
      fileMatch: '*.json',
      schema: schemaUrl,
    },
  ]

  mockFetch.mockResolvedValueOnce({
    ok: false,
  } as Response)

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    errorMessage: ExtensionDetailStrings.schemaNotFound(),
    fileMatch: '*.json',
    isValid: false,
    schemaUrl: schemaUrl,
    stringValue: schemaUrl,
  })
})

test('handles validation with valid external schema when fetch throws', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const schemaUrl: string = 'https://example.com/schema.json'
  const validations: readonly any[] = [
    {
      fileMatch: '*.json',
      schema: schemaUrl,
    },
  ]

  mockFetch.mockRejectedValueOnce(new Error('Network error'))

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    errorMessage: ExtensionDetailStrings.schemaNotFound(),
    fileMatch: '*.json',
    isValid: false,
    schemaUrl: schemaUrl,
    stringValue: schemaUrl,
  })
})

test('handles validation with relative path schema', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const schemaUrl: string = 'https://example.com/schemas/schema.json'
  const validations: readonly any[] = [
    {
      fileMatch: '*.json',
      schema: './schemas/schema.json',
    },
  ]

  mockFetch.mockResolvedValueOnce({
    ok: true,
  } as Response)

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0].schemaUrl).toBe(schemaUrl)
  expect(result[0].isValid).toBe(true)
  expect(result[0].errorMessage).toBe('')
  expect(mockFetch).toHaveBeenCalledWith(schemaUrl, { method: 'HEAD' })
})

test('handles validation with url property instead of schema', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const schemaUrl: string = 'https://json.schemastore.org/package.json'
  const validations: readonly any[] = [
    {
      fileMatch: '*.json',
      url: schemaUrl,
    },
  ]

  mockFetch.mockResolvedValueOnce({
    ok: true,
  } as Response)

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0].stringValue).toBe(schemaUrl)
  expect(result[0].schemaUrl).toBe(schemaUrl)
})

test('handles validation with empty string schema', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const validations: readonly any[] = [
    {
      fileMatch: '*.json',
      schema: '',
    },
  ]

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    errorMessage: '',
    fileMatch: '*.json',
    isValid: true,
    schemaUrl: '',
    stringValue: '',
  })
})

test('handles multiple validations', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const validations: readonly any[] = [
    {
      fileMatch: '*.json',
      schema: 'https://example.com/schema1.json',
    },
    {
      fileMatch: '*.tsconfig.json',
      schema: 'https://example.com/schema2.json',
    },
  ]

  mockFetch.mockResolvedValue({ ok: true } as Response)

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(2)
  expect(result[0].fileMatch).toBe('*.json')
  expect(result[1].fileMatch).toBe('*.tsconfig.json')
})
