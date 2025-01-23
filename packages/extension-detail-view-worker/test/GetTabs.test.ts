import { expect, test } from '@jest/globals'
import * as GetTabs from '../src/parts/GetTabs/GetTabs.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('returns all tabs with details selected', () => {
  const tabs = GetTabs.getTabs(InputName.Details)
  expect(tabs).toEqual([
    {
      label: 'Details',
      name: InputName.Details,
      selected: true,
    },
    {
      label: 'Features',
      name: InputName.Features,
      selected: false,
    },
    {
      label: 'Changelog',
      name: InputName.Changelog,
      selected: false,
    },
  ])
})
