import request from '@/utils/request'

export default{
  getList() {
    return request({
      url: '/mp_movie/actor/list',
      method: 'get'
    })
  },
  delectbyId(id){
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
  //修改讲师信息
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
  // queryPage(){
  //   return request({
  //     url: `/mp_movie/actor/page`,
  //     method: 'get'
  //   })
  // },
  hello(){
    return request({
      url: `/ucenterservice/apimember/hellolo`,
      method: 'get',
    })
  }

}
