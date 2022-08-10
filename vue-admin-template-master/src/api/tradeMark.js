import request from '@/utils/request'
//查询品牌
export const reqTradeMark = (page, limit)=>request({url:`/api/admin/product/baseTrademark/${page}/${limit}`})
// 新增品牌,修改品牌
export const addOrUpdate = (data)=>{
    if (data.id) {
        return request({url:'/api/admin/product/baseTrademark/update',data,method:'put'})
    } else {
        return request({url:'/api/admin/product/baseTrademark/save',data,method:'post'})
    }
}