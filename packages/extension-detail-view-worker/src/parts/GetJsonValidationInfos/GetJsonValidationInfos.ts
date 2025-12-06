import { existsJson } from '../ExistsJson/ExistsJson.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getSchemaLinkUrl } from '../GetSchemaLinkUrl/GetSchemaLinkUrl.ts'

export interface JsonValidationInfo {
  readonly errorMessage: string
  readonly fileMatch: string
  readonly isValid: boolean
  readonly schemaUrl: string
  readonly stringValue: string
}

export const getJsonValidationInfos = async (extensionUri: string, validations: readonly any[]): Promise<readonly JsonValidationInfo[]> => {
  const validationInfos: JsonValidationInfo[] = []
  for (const validation of validations) {
    const schema = validation.schema ?? validation.url
    const schemaLinkUrl = getSchemaLinkUrl(schema, extensionUri)
    const { fileMatch } = validation
    if (typeof schema !== 'string') {
      validationInfos.push({
        errorMessage: ExtensionDetailStrings.propertyMustBeOfTypeString(),
        fileMatch,
        isValid: false,
        schemaUrl: '',
        stringValue: JSON.stringify(schema),
      })
    } else if (schema && !schemaLinkUrl) {
      validationInfos.push({
        errorMessage: ExtensionDetailStrings.invalidLink(),
        fileMatch,
        isValid: false,
        schemaUrl: schemaLinkUrl,
        stringValue: schema,
      })
    } else if (schemaLinkUrl) {
      // TODO maybe better use filesystem.exists
      if (await existsJson(schemaLinkUrl)) {
        validationInfos.push({
          errorMessage: '',
          fileMatch,
          isValid: true,
          schemaUrl: schemaLinkUrl,
          stringValue: schema,
        })
      } else {
        validationInfos.push({
          errorMessage: ExtensionDetailStrings.schemaNotFound(),
          fileMatch,
          isValid: false,
          schemaUrl: schemaLinkUrl,
          stringValue: schema,
        })
      }
    } else {
      validationInfos.push({
        errorMessage: '',
        fileMatch,
        isValid: true,
        schemaUrl: schemaLinkUrl,
        stringValue: schema,
      })
    }
  }
  return validationInfos
}
