export const getRating = (extension: any): string => {
  if (!extension) {
    return 'n/a'
  }

  // Check for rating in various possible locations
  const rating =
    extension.rating ||
    extension.averageRating ||
    extension.marketplace?.rating ||
    extension.marketplace?.averageRating ||
    extension.packageJSON?.rating ||
    extension.packageJSON?.averageRating

  if (!rating) {
    return 'n/a'
  }

  // Format rating to one decimal place
  return rating.toFixed(1)
}

export const getRatingCount = (extension: any): string => {
  if (!extension) {
    return ''
  }

  // Check for rating count in various possible locations
  const ratingCount =
    extension.ratingCount ||
    extension.reviewCount ||
    extension.marketplace?.ratingCount ||
    extension.marketplace?.reviewCount ||
    extension.packageJSON?.ratingCount ||
    extension.packageJSON?.reviewCount

  if (!ratingCount) {
    return ''
  }

  // Format the number with commas for better readability
  return `(${ratingCount.toLocaleString()})`
}
