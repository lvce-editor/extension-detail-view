/* eslint-disable unicorn/prefer-export-from */
import { ExtensionHost } from '@lvce-editor/rpc-registry'

export const { getRuntimeStatus, registerMockRpc, set } = ExtensionHost as any
