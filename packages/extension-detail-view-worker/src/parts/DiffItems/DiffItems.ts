import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const isEqual = (oldState: ExtensionDetailState, newState: ExtensionDetailState): boolean => {
  return (
    oldState.activationEvents === newState.activationEvents &&
    oldState.badge === newState.badge &&
    oldState.categories === newState.categories &&
    oldState.changelogVirtualDom === newState.changelogVirtualDom &&
    oldState.commands === newState.commands &&
    oldState.description === newState.description &&
    oldState.detailsVirtualDom === newState.detailsVirtualDom &&
    oldState.displaySize === newState.displaySize &&
    oldState.extensionId === newState.extensionId &&
    oldState.extensionVersion === newState.extensionVersion &&
    oldState.jsonValidation === newState.jsonValidation &&
    oldState.selectedFeature === newState.selectedFeature &&
    oldState.selectedTab === newState.selectedTab &&
    oldState.settings === newState.settings &&
    oldState.themesMarkdownDom === newState.themesMarkdownDom &&
    oldState.webViews === newState.webViews &&
    oldState.sizeValue === newState.sizeValue
  )
}
