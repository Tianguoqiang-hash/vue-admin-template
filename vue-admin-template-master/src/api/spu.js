import request from '@/utils/request'

// 获取spu
export const reqSpu = ({page,limit,category3Id})=>request({url:`/api/admin/product/${page}/${limit}`,params:{category3Id}})
// 获取spu基本信息
export const reqSpuInfo = (spuId)=>request({url:`/api/admin/product/getSpuById/${spuId}`})
// 获取品牌的基本信息
export const reqTrademark = ()=>request({url:'/api/admin/product/baseTrademark/getTrademarkList'})
// 获取图片
export const reqImage = (spuId)=>request({url:`/api/admin/product/spuImageList/${spuId}`})
// 获取销售属性
export const reqBaseSaleAttrList = ()=>request({url:'/api/admin/product/baseSaleAttrList'})
//修改spu
export const updateSpu = (data)=>{
    if (data.id) {
        return request({url:'/api/admin/product/updateSpuInfo',method:'post',data})
    } else {
        return request({url:'/api/admin/product/saveSpuInfo',method:'post',data})
    }
}
// 删除spu
export const deleteSpu = (spuId)=> request({url:`/api/admin/product/deleteSpu/${spuId}`,method:'delete'})