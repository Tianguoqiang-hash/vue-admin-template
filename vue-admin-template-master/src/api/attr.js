import request from '@/utils/request'

//获取一级分类菜单
export const reqCategory1 = ()=>request({url:'/api/admin/product/getCategory1'})
//获取二级分类菜单
export const reqCategory2 = (category1Id)=>request({url:`/api/admin/product/getCategory2/${category1Id}`})
//获取三级分类菜单
export const reqCategory3 = (category2Id)=>request({url:`/api/admin/product/getCategory3/${category2Id}`})
//获取筛选商品
export const reqAttrInfoList = ({Category1id,Category2id,Category3id})=>request({url:`/api/admin/product/attrInfoList/${Category1id}/${Category2id}/${Category3id}`})
//添加属性
export const reqAddAttr = (data)=>request({url:'/api/admin/product/saveAttrInfo',data,method:'post'})