import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

export const getMoreInfoEntryValueTag = (onClick: string | number | undefined, code: boolean | undefined): number => {
  if (onClick) {
    return VirtualDomElements.A
  }
  if (code) {
    return VirtualDomElements.Code
  }
  return VirtualDomElements.Dd
}
