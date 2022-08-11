<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cForm.Category1id" @change="handler1()">
          <el-option
            v-for="(c1,index) in category1"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cForm.Category2id" @change="handler2()">
          <el-option v-for="(c2,index) in category2" :key="c2.id" :value="c2.id" :label="c2.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.Category3id" @change="handler3">
          <el-option v-for="(c3,index) in category3" :key="c3.id" :value="c3.id" :label="c3.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "categorySelect",
  data() {
    return {
        category1: [],
        category2: [],
        category3: [],
        cForm: {
            Category1id: '',
            Category2id: '',
            Category3id: '',
        },
        categoryList: []
    };
  },
  mounted() {
    this.getCategory1();
  },
  methods: {
    async getCategory1() {
      let result = await this.$api.attr.reqCategory1();
      if (result.code === 200) {
        this.category1 = result.data;
      }
    },
    async handler1(){
        this.cForm.Category2id = ''
        this.cForm.Category3id = ''
        this.category3 = []
        this.category2 = []
        let result = await this.$api.attr.reqCategory2(this.cForm.Category1id)
        if(result.code = 200){
            this.category2 = result.data
        }
    },
    async handler2(){
        this.cForm.Category3id = ''
        this.category3 = []
        let result = await this.$api.attr.reqCategory3(this.cForm.Category2id)
        if(result.code = 200){
            this.category3 = result.data
        }
    },
    async handler3(){
        let result = await this.$api.attr.reqAttrInfoList(this.cForm)
        if(result.code = 200){
            this.categoryList = result.data
            this.$emit('click',this.categoryList)
        }
    },
  },
};
</script>

<style>
</style>