import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const disableExtension = (id: string): Promise<void> => {
  // @ts-ignore todo
  return ParentRpc.invoke('ExtensionManagement.disable', id)
}
