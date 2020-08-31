import request from '@/utils/request'
export default{
    getList(){
        return request({
            url: '/mp_movie/classifications/list',
            method: 'get'
        })  
    },
    down(){
        return request({
            url: '/mp_movie/classifications/explore',
            method: 'get'
        })  
    },
}