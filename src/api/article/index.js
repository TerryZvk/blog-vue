import request from '@/utils/request'

export function getArticles(query) {
  return request({
      url: `/api/articles`,
      method: 'get',
      params: query
  })
}