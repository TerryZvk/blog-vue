
import request from '@/utils/request'

export function addUser(data) {
  return request({
      url: `/api/v1/user/register`,
      method: 'post',
      data
  })
}
