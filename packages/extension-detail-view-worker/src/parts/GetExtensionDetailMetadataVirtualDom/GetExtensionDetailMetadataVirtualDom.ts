import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getStatisticVirtualDom = (label: string, value: string, className: string): readonly VirtualDomNode[] => {
  const accessibleLabel = `${label}: ${value}`
  return [
    {
      ariaLabel: accessibleLabel,
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.ExtensionDetailStatistic, className),
      title: accessibleLabel,
      type: VirtualDomElements.Span,
    },
    text(value),
  ]
}

export const getExtensionDetailMetadataVirtualDom = (downloadCount: string, rating: string): readonly VirtualDomNode[] => {
  const hasDownloadCount = downloadCount !== 'n/a'
  const hasRating = rating !== 'n/a'
  if (!hasDownloadCount && !hasRating) {
    return []
  }
  const downloadCountDom = hasDownloadCount
    ? getStatisticVirtualDom(ExtensionDetailStrings.downloadCount(), downloadCount, ClassNames.ExtensionDetailDownloadCount)
    : []
  const ratingDom = hasRating ? getStatisticVirtualDom(ExtensionDetailStrings.rating(), rating, ClassNames.ExtensionDetailRating) : []
  return [
    {
      childCount: Number(hasDownloadCount) + Number(hasRating),
      className: ClassNames.ExtensionDetailMetadata,
      type: VirtualDomElements.Div,
    },
    ...downloadCountDom,
    ...ratingDom,
  ]
}
