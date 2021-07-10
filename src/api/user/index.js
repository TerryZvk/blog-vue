import request from '@/utils/request'

export function getUsers(query) {
  return request({
      url: `/api/v1/users`,
      method: 'get',
      params: query
  })
}