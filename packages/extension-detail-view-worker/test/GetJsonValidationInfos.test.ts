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
      schema: { invalid: 'object' },
      fileMatch: '*.json',
    },
  ]

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    isValid: false,
    stringValue: JSON.stringify({ invalid: 'object' }),
    schemaUrl: '',
    errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
    fileMatch: '*.json',
  })
})

test('handles validation with invalid link', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const validations: readonly any[] = [
    {
      schema: 'invalid link with spaces',
      fileMatch: '*.json',
    },
  ]

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    isValid: false,
    stringValue: 'invalid link with spaces',
    schemaUrl: '',
    errorMessage: ExtensionDetailStrings.invalidLink(),
    fileMatch: '*.json',
  })
})

test('handles validation with valid external schema that exists', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const schemaUrl: string = 'https://json.schemastore.org/package.json'
  const validations: readonly any[] = [
    {
      schema: schemaUrl,
      fileMatch: '*.json',
    },
  ]

  mockFetch.mockResolvedValueOnce({
    ok: true,
  } as Response)

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    isValid: true,
    stringValue: schemaUrl,
    schemaUrl: schemaUrl,
    errorMessage: '',
    fileMatch: '*.json',
  })
  expect(mockFetch).toHaveBeenCalledWith(schemaUrl, { method: 'HEAD' })
})

test('handles validation with valid external schema that does not exist', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const schemaUrl: string = 'https://example.com/nonexistent.json'
  const validations: readonly any[] = [
    {
      schema: schemaUrl,
      fileMatch: '*.json',
    },
  ]

  mockFetch.mockResolvedValueOnce({
    ok: false,
  } as Response)

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    isValid: false,
    stringValue: schemaUrl,
    schemaUrl: schemaUrl,
    errorMessage: ExtensionDetailStrings.schemaNotFound(),
    fileMatch: '*.json',
  })
})

test('handles validation with valid external schema when fetch throws', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const schemaUrl: string = 'https://example.com/schema.json'
  const validations: readonly any[] = [
    {
      schema: schemaUrl,
      fileMatch: '*.json',
    },
  ]

  mockFetch.mockRejectedValueOnce(new Error('Network error'))

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    isValid: false,
    stringValue: schemaUrl,
    schemaUrl: schemaUrl,
    errorMessage: ExtensionDetailStrings.schemaNotFound(),
    fileMatch: '*.json',
  })
})

test('handles validation with relative path schema', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const schemaUrl: string = 'https://example.com/schemas/schema.json'
  const validations: readonly any[] = [
    {
      schema: './schemas/schema.json',
      fileMatch: '*.json',
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
      url: schemaUrl,
      fileMatch: '*.json',
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
      schema: '',
      fileMatch: '*.json',
    },
  ]

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    isValid: true,
    stringValue: '',
    schemaUrl: '',
    errorMessage: '',
    fileMatch: '*.json',
  })
})

test('handles multiple validations', async () => {
  const extensionUri: string = 'https://example.com/extension'
  const validations: readonly any[] = [
    {
      schema: 'https://example.com/schema1.json',
      fileMatch: '*.json',
    },
    {
      schema: 'https://example.com/schema2.json',
      fileMatch: '*.tsconfig.json',
    },
  ]

  mockFetch.mockResolvedValue({ ok: true } as Response)

  const result: readonly JsonValidationInfo[] = await getJsonValidationInfos(extensionUri, validations)

  expect(result).toHaveLength(2)
  expect(result[0].fileMatch).toBe('*.json')
  expect(result[1].fileMatch).toBe('*.tsconfig.json')
})
