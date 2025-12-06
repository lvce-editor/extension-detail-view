/* eslint-disable unicorn/prefer-export-from */
import type { MockRpc } from '@lvce-editor/rpc'
import { ExtensionHost } from '@lvce-editor/rpc-registry'

export const { getRuntimeStatus, invoke, registerMockRpc, set } = ExtensionHost

export type { MockRpc }
