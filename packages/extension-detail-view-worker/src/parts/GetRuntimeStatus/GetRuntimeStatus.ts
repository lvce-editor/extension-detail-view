import type { RuntimeStatus } from '../RuntimeStatus/RuntimeStatus.ts'

export const getRuntimeStatus = async (extensionId: string): Promise<RuntimeStatus> => {
  return {
    id: '',
    activationEvent: '',
    status: '',
  }
}
