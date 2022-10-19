export default function getPageTitle(pageTitle?: string) {
  const title = '浏览器首页'
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
