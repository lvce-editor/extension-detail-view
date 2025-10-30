import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getSchemaLinkUrl } from '../GetSchemaLinkUrl/GetSchemaLinkUrl.ts'

export interface JsonValidationInfo {
  readonly isValid: boolean
  readonly stringValue: string
  readonly schemaUrl: string
  readonly errorMessage: string
  readonly fileMatch: string
}

const existsJson = async (schemaUrl: string): Promise<boolean> => {
  try {
    // TODO verify that response header is json
    const response = await fetch(schemaUrl, {
      method: 'HEAD',
    })
    return response.ok
  } catch {
    return false
  }
}
export const getJsonValidationInfos = async (extensionUri: string, validations: readonly any[]): Promise<readonly JsonValidationInfo[]> => {
  const validationInfos: JsonValidationInfo[] = []
  for (const validation of validations) {
    const schema = validation.schema ?? validation.url
    const schemaLinkUrl = getSchemaLinkUrl(schema, extensionUri)
    const { fileMatch } = validation
    if (typeof schema !== 'string') {
      validationInfos.push({
        isValid: false,
        stringValue: JSON.stringify(schema),
        schemaUrl: '',
        errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
        fileMatch,
      })
    } else if (schema && !schemaLinkUrl) {
      validationInfos.push({
        isValid: false,
        stringValue: schema,
        schemaUrl: schemaLinkUrl,
        errorMessage: ExtensionDetailStrings.invalidLink(),
        fileMatch,
      })
    } else if (schemaLinkUrl) {
      if (await existsJson(schemaLinkUrl)) {
        validationInfos.push({
          isValid: true,
          stringValue: schema,
          schemaUrl: schemaLinkUrl,
          errorMessage: '',
          fileMatch,
        })
      } else {
        validationInfos.push({
          isValid: false,
          stringValue: schema,
          schemaUrl: schemaLinkUrl,
          errorMessage: ExtensionDetailStrings.schemaNotFound(),
          fileMatch,
        })
      }
    } else {
      validationInfos.push({
        isValid: true,
        stringValue: schema,
        schemaUrl: schemaLinkUrl,
        errorMessage: '',
        fileMatch,
      })
    }
  }
  return validationInfos
}
