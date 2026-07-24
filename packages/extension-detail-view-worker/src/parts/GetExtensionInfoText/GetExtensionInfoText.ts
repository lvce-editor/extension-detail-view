import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

interface Row {
  readonly key: string
  readonly value: string
}

const stringifyRow = ({ key, value }: Row): string => {
  return `${key}: ${value}`
}

export const getExtensionInfoText = (state: ExtensionDetailState): string => {
  const { description, extension, extensionId, extensionVersion, name } = state
  const publisher = extension?.publisherDisplayName || extension?.publisher || 'n/a'
  const marketplaceLink = typeof extension?.url === 'string' ? extension.url : ''
  const rows: readonly Row[] = [
    {
      key: ExtensionDetailStrings.name(),
      value: name,
    },
    {
      key: ExtensionDetailStrings.extensionInfoId(),
      value: extensionId,
    },
    {
      key: ExtensionDetailStrings.description(),
      value: description,
    },
    {
      key: ExtensionDetailStrings.version(),
      value: extensionVersion,
    },
    {
      key: ExtensionDetailStrings.publisher(),
      value: publisher,
    },
    ...(marketplaceLink
      ? [
          {
            key: ExtensionDetailStrings.vsMarketplaceLink(),
            value: marketplaceLink,
          },
        ]
      : []),
  ]
  return rows.map(stringifyRow).join('\n')
}
