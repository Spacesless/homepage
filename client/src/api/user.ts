import request from '@/plugins/axios'

export interface RegisterParams {
  username: string
  password: string
  question: string
  answer: string
  tip: string
}

export function Register(data: RegisterParams) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export interface LoginParams {
  username: string
  password: string
}

export function UserLogin(data: LoginParams) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function UserLogout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

interface CheckUsernameParams {
  username: string
}

export function CheckUsername(data: CheckUsernameParams) {
  return request({
    url: '/user/check-username',
    method: 'post',
    data
  })
}

interface CheckAnswerParams {
  answer: string
}

export function CheckAnswer(data: CheckAnswerParams) {
  return request({
    url: '/user/check-answer',
    method: 'post',
    data
  })
}

interface ResetParams {
  responseId: string
  password: string
}

export function ResetPassword(data: ResetParams) {
  return request({
    url: '/user/rest',
    method: 'post',
    data
  })
}
