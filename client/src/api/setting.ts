import request from '@/plugins/axios'

export function GetSetting() {
  return request({
    url: '/setting',
    method: 'get'
  })
}

export function CreateSetting(data: object) {
  return request({
    url: '/setting',
    method: 'post',
    data
  })
}

export function UpdateSetting(userId: number, data: object) {
  return request({
    url: '/setting/' + userId,
    method: 'put',
    data
  })
}
