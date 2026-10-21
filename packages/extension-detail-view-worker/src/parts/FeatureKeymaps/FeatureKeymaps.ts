import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { FeatureState } from '../FeatureState/FeatureState.ts'
import type { Row } from '../Row/Row.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getFeatureContentHeadingVirtualDom } from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import { getTableVirtualDom } from '../GetTableVirtualDom/GetTableVirtualDom.ts'
import { hasProperty } from '../HasProperty/HasProperty.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const isEnabled = (extension: unknown): boolean => {
  return hasProperty(extension, 'keyMap') && typeof extension.keyMap === 'object' && extension.keyMap !== null
}

export const getDetails = async (extension: unknown): Promise<FeatureState<'extension'>> => ({ extension })

const asRecord = (value: unknown): Readonly<Record<string, unknown>> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Readonly<Record<string, unknown>>) : {}
}

const getModeRows = ([modeName, mode]: readonly [string, unknown]): readonly Row[] => {
  const bindings = asRecord(asRecord(mode).bindings)
  return Object.entries(bindings).flatMap(([key, value]: readonly [string, unknown]): readonly Row[] => {
    const binding = asRecord(value)
    if (typeof binding.command !== 'string') return []
    return [
      [modeName, key, binding.command, typeof binding.mode === 'string' ? binding.mode : ''].map((value) => ({ type: TableCellType.Code, value })),
    ]
  })
}

const featureContentNode: VirtualDomNode = { childCount: 2, className: ClassNames.FeatureContent, type: VirtualDomElements.Div }

export const getVirtualDom = ({ extension }: FeatureState<'extension'>): readonly VirtualDomNode[] => {
  const modes = asRecord(asRecord(asRecord(extension).keyMap).modes)
  const rows = Object.entries(modes).flatMap(getModeRows)
  return [
    featureContentNode,
    ...getFeatureContentHeadingVirtualDom(ExtensionDetailStrings.keymaps()),
    ...getTableVirtualDom({
      headings: [ExtensionDetailStrings.mode(), ExtensionDetailStrings.key(), ExtensionDetailStrings.command(), ExtensionDetailStrings.nextMode()],
      rows,
    }),
  ]
}
