/* eslint-disable unicorn/prefer-export-from */
import type { MockRpc } from '@lvce-editor/rpc-registry'
import { FileSystemWorker } from '@lvce-editor/rpc-registry'

export const { set, exists, readDirWithFileTypes, readFile, invoke, registerMockRpc } = FileSystemWorker

export const readFileAsBlob = async (uri: string): Promise<any> => {
  // TODO maybe readAsObjectUrl?
  // @ts-ignore
  return invoke('FileSystem.readFileAsBlob', uri)
}

export type { MockRpc }
