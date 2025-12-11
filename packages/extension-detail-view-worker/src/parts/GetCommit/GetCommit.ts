import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getCommit = async (): Promise<string> => {
  try {
    const commit = await RendererWorker.invoke('Layout.getCommit')
    return commit
  } catch {
    return ''
  }
}
