export const getDownloadCount = (extension: any): string => {
  if (!extension) {
    return 'n/a'
  }

  // Check for download count in various possible locations
  const downloadCount =
    extension.downloadCount ||
    extension.downloads ||
    extension.marketplace?.downloadCount ||
    extension.marketplace?.downloads ||
    extension.packageJSON?.downloadCount ||
    extension.packageJSON?.downloads

  if (!downloadCount) {
    return 'n/a'
  }

  // Format the number with commas for better readability
  return downloadCount.toLocaleString()
}
