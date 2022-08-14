<template>
  <div>
    <el-card>
      <categorySelect @click1="getSpuList" page='1' limit='3'></categorySelect>
    </el-card>
    <el-card>
      <div v-if="showWhich === 1">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="showWhat1()">添加SPU</el-button>
        <el-table :data="spuList.records" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center" header-align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width"></el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template v-slot="scope">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click=""></el-button>
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showWhat2(scope.row)"></el-button>
              <el-button type="primary" icon="el-icon-info" size="mini"></el-button>
              <el-popconfirm title="确定删除吗？" @onConfirm="deleteSpu(scope.row)">
                <el-button type="primary" icon="el-icon-delete" size="mini" slot="reference" style="margin-left:10px"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
          <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
        <el-pagination :current-page="1" :page-sizes="[4, 5, 6]" :page-size="limit" layout="prev, pager, next, jumper, ->, sizes, total" style="text-align:center;"
          :total="spuList.total" @current-change="change">
        </el-pagination>
      </div>
      <div v-show="showWhich === 2">
        <spuForm @showWhat=showWhat3 ref="initSpudata"></spuForm>
      </div>
      <div v-show="showWhich === 3">
        <skuForm></skuForm>
      </div>
    </el-card>
  </div>
</template>

<script>
import spuForm from './spuForm'
import skuForm from './skuForm'
export default {
    name: 'spu',
    components: {spuForm,skuForm},
    data() {
      return {
        spuList: {},
        limit: 3,
        showWhich: 1,
      }
    },
    methods: {
      getSpuList(spuList){
        this.spuList = spuList
      },
      async change(page){
        let result2 = await this.$api.spu.reqSpu({page,limit:this.limit,category3Id:this.spuList.records[0].category3Id})
        if (result2.code = 200) {
            this.spuList = result2.data
        }
      },
      showWhat1(){
        this.showWhich = 2
        this.$refs.initSpudata.addSpuData(this.spuList.records[0].category3Id)
      },
      showWhat2(row){
        this.showWhich = 2
        this.spuForm = {...row}
        this.$refs.initSpudata.initSpudata(row)
      },
      showWhat3(num){
        this.showWhich = num  
      },
      async deleteSpu(row){
        let result = this.$api.spu.deleteSpu(row.id)
        if(result.code === 200){
          this.$message('删除成功') 
        }
      }
    }
}
</script>

<style>
 
</style>