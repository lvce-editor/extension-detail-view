import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const disableExtension = (id: string): Promise<void> => {
  return ParentRpc.invoke('ExtensionManagement.disable', id)
}
