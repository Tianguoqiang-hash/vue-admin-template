<template>
  <div>
    <el-card>
      <categorySelect @click="getCategoryList"></categorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" size="mini" :disabled="!categoryList.length" @click="add">添加属性</el-button>
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
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="update(scope.row)"></el-button>
              <el-button type="warning" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" model="aForm" label-width="80px" @submit.native.prevent>
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="aForm.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttr" :disabled="!aForm.attrName">添加属性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table :data="aForm.attrValueList" style="width: 100%" border>
          <el-table-column label="序号" width="80" type="index" align="center" header-align="center"></el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width" header-align="center">
            <template v-slot="scope">
              <el-input v-model="scope.row.valueName" v-if="scope.row.isShowInput" size="mini" placeholder="请输入属性值名称" @blur="scope.row.isShowInput = false" autofocus="true"></el-input>
              <span v-else @click="scope.row.isShowInput = true">{{scope.row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width" header-align="center">
            <template v-slot="scope">
              <el-button icon="el-icon-delete" type="warning" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" :disabled="!aForm.attrValueList.length">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
    name: 'attr',
    data() {
      return {
        categoryList: [],
        isShowTable: true,
        aForm: {
          attrName: "",
          attrValueList: [],
          categoryId: undefined,
          categoryLevel: 3,
        }
      }
    },
    methods: {
      getCategoryList(categoryList){
        this.categoryList = categoryList
      },
      addAttr(){
        this.aForm.attrValueList.push({attrId:this.aForm.id || undefined,valueName:'',isShowInput:true})
      },
      add(){
        this.isShowTable = false
        this.aForm.attrValueList = []
        this.aForm.attrName = ''
        this.aForm.categoryId = this.categoryList[0].categoryId
      },
      update(row){
        this.isShowTable = false
        this.aForm = cloneDeep(row)
        this.aForm.attrValueList.forEach((item)=>{
          this.$set(item,'isShowInput',false)
        })
      }
    }
}
</script>

<style>

</style>