import request from '@/utils/request'

const api_name = '/admin/acl/permission'
export default {
    //获取菜单列表
    getNestedTreeList() {
        return request({
            url: `${api_name}/all`,
            method: 'get'
        })
    },

    //根据id移除菜单
    removeById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    },

    //新增菜单
    saveLevelOne(menu) {
        return request({
            url: `${api_name}`,
            method: 'post',
            data: menu
        })
    },

    //修改
    update(menu) {
        return request({
            url: `${api_name}`,
            method: 'put',
            data: menu
        })
    },

    //根据角色获取权限
    toAssign(roleId) {
        return request({
            url: `${api_name}/toAssign/${roleId}`,
            method: 'get'
        })
    },

    //给角色分配权限
    doAssign(roleId,permissionId){
        return request({
            url: `${api_name}/doAssign`,
            method: 'post',
            params: {roleId,permissionId}

        })
    },

    //test hello

}
