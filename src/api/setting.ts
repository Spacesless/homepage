import request from '@/plugins/axios'

export function GetSetting() {
  return request({
    url: '/setting',
    method: 'get'
  })
}

export function CreateSetting(data: object) {
  return request({
    url: '/setting/create',
    method: 'put',
    data
  })
}

export function UpdateSetting(data: object) {
  return request({
    url: '/setting/update',
    method: 'post',
    data
  })
}
