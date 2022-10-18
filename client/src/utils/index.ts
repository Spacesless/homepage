/**
 * 获取localStorage
 * @param {String} key localStorage键名
 * @returns {Object} 格式化的json数据
 */
export function getLocalStorage(key: string) {
  const data = localStorage.getItem(key)
  let result
  if (data) {
    try {
      result = JSON.parse(data)
    } catch {
      result = data
    }
  }
  return result
}

/**
 * 设置localStorage
 * @param {String} key localStorage键名
 * @param {*} data 数据
 */
export function setLocalStorage(key: string, data: any) {
  const format = typeof data === 'object' ? JSON.stringify(data) : data
  localStorage.setItem(key, format)
}

/**
 * 更新localStorage
 * @param {String} key localStorage键名
 * @param {*} data 数据
 */
export function updateLocalStorage(key: string, data: any) {
  const source = getLocalStorage(key)
  if (typeof data === 'object') {
    const format = { ...source, ...data }
    localStorage.setItem(key, JSON.stringify(format))
  } else {
    localStorage.setItem(key, data)
  }
}

/**
 * 移除localStorage
 * @param {String} key localStorage键名
 */
export function removeLocalStorage(key: string) {
  localStorage.removeItem(key)
}
