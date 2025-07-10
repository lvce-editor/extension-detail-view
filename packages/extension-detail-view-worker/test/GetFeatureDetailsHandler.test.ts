import { expect, test } from '@jest/globals'
import { getFeatureDetailsCommand } from '../src/parts/GetFeatureDetailsCommands/GetFeatureDetailsCommands.ts'
import { getFeatureDetailsHandler } from '../src/parts/GetFeatureDetailsHandler/GetFeatureDetailsHandler.ts'
import { getFeatureDetailsJsonValidation } from '../src/parts/GetFeatureDetailsJsonValidation/GetFeatureDetailsJsonValidation.ts'
import { getFeatureDetailsProgrammingLanguages } from '../src/parts/GetFeatureDetailsProgrammingLanguages/GetFeatureDetailsProgrammingLanguages.ts'
import { getFeatureDetailsSettings } from '../src/parts/GetFeatureDetailsSettings/GetFeatureDetailsSettings.ts'
import { getFeatureDetailsTheme } from '../src/parts/GetFeatureDetailsTheme/GetFeatureDetailsTheme.ts'
import { getFeatureDetailsWebView } from '../src/parts/GetFeatureDetailsWebView/GetFeatureDetailsWebView.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('should return getFeatureDetailsCommand for Commands feature', () => {
  const handler = getFeatureDetailsHandler(InputName.Commands)
  expect(handler).toBe(getFeatureDetailsCommand)
})

test('should return getFeatureDetailsJsonValidation for JsonValidation feature', () => {
  const handler = getFeatureDetailsHandler(InputName.JsonValidation)
  expect(handler).toBe(getFeatureDetailsJsonValidation)
})

test('should return getFeatureDetailsProgrammingLanguages for ProgrammingLanguages feature', () => {
  const handler = getFeatureDetailsHandler(InputName.ProgrammingLanguages)
  expect(handler).toBe(getFeatureDetailsProgrammingLanguages)
})

test('should return getFeatureDetailsSettings for Settings feature', () => {
  const handler = getFeatureDetailsHandler(InputName.Settings)
  expect(handler).toBe(getFeatureDetailsSettings)
})

test('should return getFeatureDetailsWebView for WebViews feature', () => {
  const handler = getFeatureDetailsHandler(InputName.WebViews)
  expect(handler).toBe(getFeatureDetailsWebView)
})

test('should return getFeatureDetailsTheme for Theme feature', () => {
  const handler = getFeatureDetailsHandler(InputName.Theme)
  expect(handler).toBe(getFeatureDetailsTheme)
})

test('should throw error for unknown feature', () => {
  expect(() => {
    getFeatureDetailsHandler('UnknownFeature')
  }).toThrow('unknown feature details handler: UnknownFeature')
})

test('should throw error for empty feature name', () => {
  expect(() => {
    getFeatureDetailsHandler('')
  }).toThrow('unknown feature details handler: ')
})

test('should throw error for null feature name', () => {
  expect(() => {
    getFeatureDetailsHandler(null as any)
  }).toThrow('unknown feature details handler: null')
})
