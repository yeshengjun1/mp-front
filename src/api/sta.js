import request from '@/utils/request'
const api_name = '/admin/statistics/daily'
export default {
  createStatistics(day) {
    return request({
      url: `${api_name}/${day}`,
      method: 'post'
    })
  },
  showDaily(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
}
