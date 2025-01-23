import { expect, test } from '@jest/globals'
import * as GetSelectTabHandler from '../src/parts/GetSelectTabHandler/GetSelectTabHandler.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as SelectTabChangelog from '../src/parts/SelectTabChangelog/SelectTabChangelog.ts'
import * as SelectTabDefault from '../src/parts/SelectTabDefault/SelectTabDefault.ts'
import * as SelectTabDetails from '../src/parts/SelectTabDetails/SelectTabDetails.ts'
import * as SelectTabFeatures from '../src/parts/SelectTabFeatures/SelectTabFeatures.ts'

test('returns details tab handler', () => {
  const handler = GetSelectTabHandler.getSelectTabHandler(InputName.Details)
  expect(handler).toBe(SelectTabDetails.selectTabDetails)
})

test('returns features tab handler', () => {
  const handler = GetSelectTabHandler.getSelectTabHandler(InputName.Features)
  expect(handler).toBe(SelectTabFeatures.selectTab)
})

test('returns changelog tab handler', () => {
  const handler = GetSelectTabHandler.getSelectTabHandler(InputName.Changelog)
  expect(handler).toBe(SelectTabChangelog.selectTabChangelog)
})

test('returns default tab handler for unknown tab', () => {
  const handler = GetSelectTabHandler.getSelectTabHandler('unknown')
  expect(handler).toBe(SelectTabDefault.selectTabDefault)
})
