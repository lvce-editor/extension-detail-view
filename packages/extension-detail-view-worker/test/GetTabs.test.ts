import { expect, test } from '@jest/globals'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetTabs from '../src/parts/GetTabs/GetTabs.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('returns all tabs with details selected', () => {
  const tabs = GetTabs.getTabs(InputName.Details, true, true, true)
  expect(tabs).toEqual([
    {
      enabled: true,
      label: ExtensionDetailStrings.details(),
      name: InputName.Details,
      selected: true,
    },
    {
      enabled: true,
      label: ExtensionDetailStrings.features(),
      name: InputName.Features,
      selected: false,
    },
    {
      enabled: true,
      label: ExtensionDetailStrings.changelog(),
      name: InputName.Changelog,
      selected: false,
    },
  ])
})

test('returns contents tab when enabled', () => {
  const tabs = GetTabs.getTabs(InputName.Contents, true, false, false, true)
  expect(tabs.at(-1)).toEqual({
    enabled: true,
    label: ExtensionDetailStrings.contents(),
    name: InputName.Contents,
    selected: true,
  })
})
