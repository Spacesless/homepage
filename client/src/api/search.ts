import request from '@/plugins/axios'

export function SearchSuggestion(keyword: string) {
  return request({
    url: '/suggestion',
    method: 'get',
    params: {
      keyword
    }
  })
}
