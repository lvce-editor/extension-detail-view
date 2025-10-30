import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export interface CellRenderer {
  (value: string, ...props: readonly any[]): readonly VirtualDomNode[]
}
