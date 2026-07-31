import type { FeatureState } from '../FeatureState/FeatureState.ts'
import { getThemeDetailsVirtualDom } from '../GetThemeDetailsVirtualDom/GetThemeDetailsVirtualDom.ts'

export type FeatureThemeState = FeatureState<'themesMarkdownDom'>

export const getThemeDetails = async (
  extension: any,
  _baseUrl: string,
  _locationProtocol: string,
  _cacheName: string,
): Promise<FeatureThemeState> => {
  const { colorThemes, iconThemes, productIconThemes } = extension
  const themesMarkdownDom = getThemeDetailsVirtualDom(colorThemes || [], iconThemes || [], productIconThemes || [])
  return {
    themesMarkdownDom,
  }
}
