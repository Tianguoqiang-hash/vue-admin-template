<template>
  <div>
    <el-button type="primary">添加</el-button>
    <el-table
      :data="records.records"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="80%"
        type="index">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="品牌LOGO"
        width="width">
        <template v-slot:default="scope">
            <img :src="scope.row.logoUrl">
        </template>
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="width">
      </el-table-column>
    </el-table>
    <el-pagination
      style="textAlign: center"
      layout="prev, pager, next,  jumper, ->, sizes, total"
      :total="records.total" 
      :current-page="records.current"
      :page-sizes="[100, 200, 300, 400]"
      :pager-count="5"
      :page-size="records.size"
      @current-change="getTradeMark">
    </el-pagination>
  </div>
</template>

<script>
export default {
    name: 'trademark',
    data() {
      return {
        limit: 3,
        records: {}
      }
    },
    mounted(){
        this.getTradeMark()
    },
    methods:{
      async getTradeMark(page=1){
        const result = await this.$api.tradeMark.reqTradeMark(page, this.limit)
        this.records = result.data
        console.log(result.data);
      }
    }
}
</script>

<style>

</style>