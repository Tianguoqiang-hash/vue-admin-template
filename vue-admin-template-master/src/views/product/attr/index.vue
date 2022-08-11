<template>
  <div>
    <el-card>
      <categorySelect @click="getCategoryList"></categorySelect>
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus" size="mini">添加属性</el-button>
      <el-table
        :data="categoryList"
        border
        style="width: 100%">
        <el-table-column
          header-align="center"
          align="center"
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="attrName"
          header-align="center"
          label="属性名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="attrValueList"
          header-align="center"
          label="属性值列表"
          width="width">
          <template v-slot="scope">
            <el-tag type="success" v-for="item in scope.row.attrValueList" :key="item.id">{{item.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="prop"
          header-align="center"
          label="操作"
          width="120">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="warning" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
    name: 'attr',
    data() {
      return {
        categoryList: []
      }
    },
    methods: {
      getCategoryList(categoryList){
        this.categoryList = categoryList
      }
    }
}
</script>

<style>

</style>