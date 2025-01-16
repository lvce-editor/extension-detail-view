export const handleTabsClick = async (state: any, name: string): Promise<any> => {
  // TODO load the tabs content if needed
  return {
    ...state,
    selectedTab: name,
  }
}
