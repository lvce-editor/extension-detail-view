/* eslint-disable unicorn/prefer-export-from */
import type { MockRpc } from '@lvce-editor/rpc'
import { ExtensionHost } from '@lvce-editor/rpc-registry'

export const { set, invoke, getRuntimeStatus, registerMockRpc } = ExtensionHost

export type { MockRpc }
