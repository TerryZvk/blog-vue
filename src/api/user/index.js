
import request from '@/utils/request'

export function addUser(data) {
  return request({
      url: `/api/users`,
      method: 'post',
      data
  })
}
