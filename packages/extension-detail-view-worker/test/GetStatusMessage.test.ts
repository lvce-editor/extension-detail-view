import { test, expect } from '@jest/globals'
import { getStatusMessage } from '../src/parts/GetStatusMessage/GetStatusMessage.ts'
import * as RuntimeStatusType from '../src/parts/RuntimeStatusType/RuntimeStatusType.ts'

test('getStatusMessage should return "none" for RuntimeStatusType.None', () => {
  const result = getStatusMessage(RuntimeStatusType.None)
  expect(result).toBe('none')
})

test('getStatusMessage should return "importing" for RuntimeStatusType.Importing', () => {
  const result = getStatusMessage(RuntimeStatusType.Importing)
  expect(result).toBe('importing')
})

test('getStatusMessage should return "Activating" for RuntimeStatusType.Activating', () => {
  const result = getStatusMessage(RuntimeStatusType.Activating)
  expect(result).toBe('Activating')
})

test('getStatusMessage should return "activated" for RuntimeStatusType.Activated', () => {
  const result = getStatusMessage(RuntimeStatusType.Activated)
  expect(result).toBe('activated')
})

test('getStatusMessage should return "error" for RuntimeStatusType.Error', () => {
  const result = getStatusMessage(RuntimeStatusType.Error)
  expect(result).toBe('error')
})

test('getStatusMessage should return "unknown" for unknown status type', () => {
  const result = getStatusMessage(999)
  expect(result).toBe('unknown')
})
