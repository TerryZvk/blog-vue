import request from '@/utils/request'

export function getArticles(query) {
  return request({
      url: `/api/v1/articles`,
      method: 'get',
      params: query
  })
}