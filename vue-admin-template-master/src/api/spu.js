import request from '@/utils/request'

// 获取spu
export const reqSpu = ({page,limit,category3Id})=>request({url:`/api/admin/product/${page}/${limit}`,params:{category3Id}})