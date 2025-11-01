import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FeatureProgrammingLanguagesVirtualDom from '../src/parts/FeatureProgrammingLanguagesVirtualDom/FeatureProgrammingLanguagesVirtualDom.ts'
import * as GetFeatureProgrammingLanguagesVirtualDom from '../src/parts/GetFeatureProgrammingLanguagesVirtualDom/GetFeatureProgrammingLanguagesVirtualDom.ts'

test('returns virtual dom for empty programming languages', () => {
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    programmingLanguages: [],
  }

  const result = FeatureProgrammingLanguagesVirtualDom.getProgrammingLanguagesVirtualDom(state)

  const expected = GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom([])
  expect(result).toEqual(expected)
})

test('returns virtual dom for programming languages with entries', () => {
  const programmingLanguages = [
    [
      { type: 1, value: 'typescript' },
      { type: 2, value: 'TypeScript' },
      { type: 2, value: '.ts,.tsx' },
      { type: 2, value: 'typescript.tmLanguage.json' },
      { type: 2, value: 'typescript.json' },
    ],
  ]
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    programmingLanguages,
  }

  const result = FeatureProgrammingLanguagesVirtualDom.getProgrammingLanguagesVirtualDom(state)

  const expected = GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom(programmingLanguages)
  expect(result).toEqual(expected)
})

test('returns virtual dom for multiple programming languages', () => {
  const programmingLanguages = [
    [
      { type: 1, value: 'typescript' },
      { type: 2, value: 'TypeScript' },
      { type: 2, value: '.ts,.tsx' },
      { type: 2, value: 'typescript.tmLanguage.json' },
      { type: 2, value: 'typescript.json' },
    ],
    [
      { type: 1, value: 'javascript' },
      { type: 2, value: 'JavaScript' },
      { type: 2, value: '.js,.jsx' },
      { type: 2, value: 'javascript.tmLanguage.json' },
      { type: 2, value: 'javascript.json' },
    ],
  ]
  const state: ExtensionDetailState = {
    ...createDefaultState(),
    programmingLanguages,
  }

  const result = FeatureProgrammingLanguagesVirtualDom.getProgrammingLanguagesVirtualDom(state)

  const expected = GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom(programmingLanguages)
  expect(result).toEqual(expected)
})
