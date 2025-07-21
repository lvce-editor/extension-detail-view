import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export interface Menu {
  readonly id: number
  readonly entries: readonly MenuEntry[]
}
