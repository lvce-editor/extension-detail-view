import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const uninstallExtension = (id: string): Promise<void> => {
  return ParentRpc.invoke('ExtensionManagement.uninstall', id)
}
