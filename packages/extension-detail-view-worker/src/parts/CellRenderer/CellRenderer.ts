import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export interface CellRenderer {
  (value: string): readonly VirtualDomNode[]
}
