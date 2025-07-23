import * as RuntimeStatusType from '../RuntimeStatusType/RuntimeStatusType.ts'

export const getStatusMessage = (statusType: number): string => {
  switch (statusType) {
    case RuntimeStatusType.Activated:
      return 'activated'
    case RuntimeStatusType.None:
      return 'none'
    case RuntimeStatusType.Activating:
      return 'Activating'
    case RuntimeStatusType.Error:
      return 'error'
    case RuntimeStatusType.Importing:
      return 'importing'
    default:
      return 'unknown'
  }
}
