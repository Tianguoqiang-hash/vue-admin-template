<template>
  <div>
    <el-card>
      <categorySelect @click1="getSpuList" page='1' limit='3'></categorySelect>
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus" size="mini">添加SPU</el-button>
      <el-table :data="spuList.records" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="80" align="center" header-align="center"></el-table-column>
        <el-table-column prop="spuName" label="SPU名称" width="width"></el-table-column>
        <el-table-column prop="description" label="SPU描述" width="width"></el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-info" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      <el-pagination current-page="1" :page-sizes="[10, 20, 50]" page-size="3" layout="prev, pager, next, jumper, ->, sizes, total" style="text-align:center;"
        :total="50">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
    name: 'spu',
    data() {
      return {
        spuList: {}
      }
    },
    methods: {
      getSpuList(spuList){
        this.spuList = spuList
        console.log(this.spuList);
      },
    }
}
</script>

<style>

</style>