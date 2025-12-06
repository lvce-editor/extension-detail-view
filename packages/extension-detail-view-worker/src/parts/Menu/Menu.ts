import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export interface Menu {
  readonly entries: readonly MenuEntry[]
  readonly id: number
}
