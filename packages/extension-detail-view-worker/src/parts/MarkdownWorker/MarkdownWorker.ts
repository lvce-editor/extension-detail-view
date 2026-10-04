import { MarkdownWorker } from '@lvce-editor/rpc-registry'

export const getVirtualDom = MarkdownWorker.getVirtualDom.bind(MarkdownWorker)
export const registerMockRpc = MarkdownWorker.registerMockRpc.bind(MarkdownWorker)
export const render = MarkdownWorker.render.bind(MarkdownWorker)
export const set = MarkdownWorker.set.bind(MarkdownWorker)
