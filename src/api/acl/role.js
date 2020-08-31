import request from '@/utils/request'

const api_name = '/admin/acl/role'

export default {
    //分页获取角色列表
    getRoleListByPage(page,limit,searchObj){
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            data: searchObj
        })
    },

    //根据id获取角色
    getRoleById(id){
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    },

    //新增角色
    saveRole(role){
        return request({
            url: `${api_name}`,
            method: 'post',
            data: role
        })
    },

    //修改角色
    updateRole(role) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: role
        })
    },

    //删除角色
    removeRole(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },

    //根据id列表删除
    removeRolesByIds(roleIds){
        return request({
            url: `${api_name}`,
            
        })
    }
}