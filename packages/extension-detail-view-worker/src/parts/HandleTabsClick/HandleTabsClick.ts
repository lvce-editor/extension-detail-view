export const handleTabsClick = (state: any, name: string): any => {
  // TODO load the tabs content if needed
  return {
    ...state,
    selectedTab: name,
  }
}
