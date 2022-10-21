export default function getPageTitle(pageTitle?: string) {
  const title = 'Geek Homepage'
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
