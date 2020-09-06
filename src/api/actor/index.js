import request from '@/utils/request'

export default{
  getList() {
    return request({
      url: '/mp_movie/actor/list',
      method: 'get'
    })
  },
  deleteById(id){
    return request({
      url: `/mp_movie/actor/${id}`,
      method: 'delete'
    })
  },
  addactor(actor){
    return request(
      {
        url: `/mp_movie/actor`,
        method: 'post',
        data: actor
      }
    )
  },
  //修改演员信息
  updateactor(actor){
    return request(
      {
        url: `/mp_movie/actor`,
        method: 'put',
        data: actor
      }
    )
  },
  getInfoById(id){
    return request({
      url: `/mp_movie/actor?id=${id}`,
      method: 'get'
    })
  },
  //条件分页查询
  queryByPage(pageInfo){
    return request({
      url: `/mp_movie/actor/page`,
      method: 'post',
      data: pageInfo
    })
  },

}
