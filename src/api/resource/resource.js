import request from '@/utils/request'
export default{
  addresource(resource) {
    return request({
      url: '/mp_movie/resource',
      method: 'post',
      data: resource
    })
  },

    //获取要发布的资源信息
    queryResourceInfo(rid) {
        return request({
            url: `/mp_movie/resource/info/${rid}`,
            method: 'get'
        })
    },

    //发布资源
    publishResource(rid){
        return request({
            url: `/mp_movie/resource/info/${rid}`,
            method: 'post'
        })
    },
    //获取所有资源信息
    queryResources(pageInfo){
        return request({
            url: `/mp_movie/resource/page`,
            method: 'post',
            data: pageInfo

        })
    },

    deleteResource(id){
        return request({
            url: `/mp_movie/resource/${id}`,
            method: 'delete',
        })
    }

}
