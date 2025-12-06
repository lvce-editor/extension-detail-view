/* eslint-disable unicorn/prefer-export-from */
import type { MockRpc } from '@lvce-editor/rpc'
import { MarkdownWorker } from '@lvce-editor/rpc-registry'

export const { getVirtualDom, registerMockRpc, render, set } = MarkdownWorker

export type { MockRpc }
