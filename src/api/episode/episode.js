
import request from '@/utils/request'
export default{
    //添加剧集
    addEpisode(episode){
        return request({
            url: '/mp_movie/episode',
            method: 'post',
            data: episode
        })  
    },
    // 获取视频信息
    getVideoInfo(videoId){
        return request({
            url: `vodservice/vod/${videoId}`,
            method: 'get',
        })  
    },

    //根据剧id查询所有集
    queryEpisodes(resourceId){
        return request({
            url: `/mp_movie/episode/${resourceId}`,
            method: 'get',
        })  
    },

    // deleteEpisodeById(id){
    //     return request({
    //         url: `/mp_movie/episode/del/${id}`,
    //         method: 'get',
    //     })  
    // },

    deleteEpisodeById(id,videoId){
        return request({
          url: `/mp_movie/episode/${id}/${videoId}`,
          method: 'delete'
        })
    },
    
    
}