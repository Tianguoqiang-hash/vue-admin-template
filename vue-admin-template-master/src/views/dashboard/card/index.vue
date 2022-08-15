<template>
  <div>
    <el-row :gutter="10">
        <el-col :span="6">
          <el-card>
            <detail count="88460" title="总销售额">
                <template v-slot:content>
                    <span>周同比 56.67%</span>
                    <svg t="1660548640655" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4803" width="20" height="20"><path d="M960 704L512 256l-448 448z" fill="#707070" p-id="4804"></path></svg>
                    &nbsp;&nbsp;<span>周同比 19.16%</span>
                    <svg t="1660549301136" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6064" width="20" height="20"><path d="M64 320l448 448 448-448z" fill="#707070" p-id="6065"></path></svg>
                </template>
                <template v-slot:footer>
                    <span>总销售额 ￥12306</span>
                </template>
            </detail>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <detail count="25356" title="访问量">
                <template v-slot:content>
                    <lineChart></lineChart>
                </template>
                <template v-slot:footer>
                    <span>日访问量 1234</span>
                </template>
            </detail>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <detail count="44650" title="支付笔数">
                <template v-slot:content>
                    <barChart></barChart>
                </template>
                <template v-slot:footer>
                    <span>转化率 65%</span>
                </template>
            </detail>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <detail count="78" title="运营活动效果">
                <template v-slot:content>
                    <progressChart></progressChart>
                </template>
                <template v-slot:footer>
                   <span>周同比 56.67%</span>
                   <svg t="1660548640655" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4803" width="20" height="20"><path d="M960 704L512 256l-448 448z" fill="#707070" p-id="4804"></path></svg>
                   &nbsp;&nbsp;<span>周同比 19.16%</span>
                   <svg t="1660549301136" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6064" width="20" height="20"><path d="M64 320l448 448 448-448z" fill="#707070" p-id="6065"></path></svg>
                </template>
            </detail>
          </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import detail from './detail'
import lineChart from './lineChart'
import barChart from './barChart'
import progressChart from './progressChart'
export default {
    components: {detail, lineChart, barChart, progressChart}
}
</script>

<style>

</style>