import * as RuntimeStatusType from '../RuntimeStatusType/RuntimeStatusType.ts'

export const getStatusMessage = (statusType: number): string => {
  switch (statusType) {
    case RuntimeStatusType.Activated:
      return 'activated'
    case RuntimeStatusType.Activating:
      return 'Activating'
    case RuntimeStatusType.Error:
      return 'error'
    case RuntimeStatusType.Importing:
      return 'importing'
    case RuntimeStatusType.None:
      return 'none'
    default:
      return 'unknown'
  }
}
