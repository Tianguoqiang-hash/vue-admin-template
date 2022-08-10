import request from '@/utils/request'

export const reqTradeMark = (page, limit)=>request({url:`/api/admin/product/baseTrademark/${page}/${limit}`})