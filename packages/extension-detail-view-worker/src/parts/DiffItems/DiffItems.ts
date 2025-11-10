import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const isEqual = (oldState: ExtensionDetailState, newState: ExtensionDetailState): boolean => {
  return (
    oldState.activationEvents === newState.activationEvents &&
    oldState.badge === newState.badge &&
    oldState.buttons === newState.buttons &&
    oldState.categories === newState.categories &&
    oldState.changelogVirtualDom === newState.changelogVirtualDom &&
    oldState.commands === newState.commands &&
    oldState.description === newState.description &&
    oldState.detailsVirtualDom === newState.detailsVirtualDom &&
    oldState.disabled === newState.disabled &&
    oldState.displaySize === newState.displaySize &&
    oldState.extensionId === newState.extensionId &&
    oldState.extensionVersion === newState.extensionVersion &&
    oldState.features === newState.features &&
    oldState.installationEntries === newState.installationEntries &&
    oldState.jsonValidation === newState.jsonValidation &&
    oldState.resources === newState.resources &&
    oldState.selectedFeature === newState.selectedFeature &&
    oldState.selectedTab === newState.selectedTab &&
    oldState.settings === newState.settings &&
    oldState.showSideBar === newState.showSideBar &&
    oldState.sizeValue === newState.sizeValue &&
    oldState.themesMarkdownDom === newState.themesMarkdownDom &&
    oldState.webViews === newState.webViews
  )
}
