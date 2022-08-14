<template>
  <el-form ref="form" :model="spu" label-width="80px">
    <el-form-item label="SPU名称">
      <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select v-model="spu.tmId" placeholder="请选择品牌">
        <el-option :label="item.tmName" :value="item.id" v-for="item in tradeMarkList" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" v-model="spu.description" placeholder="SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :file-list="spuImage"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
        <el-select v-model="attrID" placeholder="选择">
            <el-option :label="item.name" :value="`${item.id}:${item.name}`" v-for="item in saleAttr" :key="item.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" @click="addSaveAttr">添加销售属性</el-button>
        <el-table :data="spu.spuSaleAttrList" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="80" align="center" header-align="center"></el-table-column>
            <el-table-column prop="saleAttrName" label="属性名" width="width"></el-table-column>
            <el-table-column prop="spuSaleAttrValueList" label="属性值名称列表" width="width">
              <!-- @close="handleClose(tag)" -->
              <template v-slot="scope">
                <el-tag :key="tag.id" v-for="(tag,index) in scope.row.spuSaleAttrValueList" closable :disable-transitions="false" @close="scope.row.spuSaleAttrValueList.splice(index,1)">{{tag.saleAttrValueName}}</el-tag>
                <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.saleAttrValueName" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)"></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">添加</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <template v-slot="scope">
                <el-button type="warning" size="mini" icon="el-icon-delete" @click="spu.spuSaleAttrList.splice(scope.$index,1)"></el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="addOrUpdate">保存</el-button>
        <el-button @click="$emit('showWhat',1)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
        dialogVisible: false,
        dialogImageUrl: '',
        spu: {
          category3Id: 0,
          description: "",
          spuImageList: [
            {
              "id": 0,
              "imgName": "",
              "imgUrl": "",
              "spuId": 0
            }
          ],
          spuName: "",
          spuSaleAttrList: [],
          tmId: 0
        },
        attrID: '',
        tradeMarkList: [],
        spuImage: [],
        saleAttr: [],
    }
  },
  methods: {
    handleRemove(file, fileList) {
        this.spuImage = fileList
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    async initSpudata(row){
      let result = await this.$api.spu.reqSpuInfo(row.id)
      if(result.code === 200){
        this.spu = result.data
      }
      let result1 = await this.$api.spu.reqTrademark()
      if(result1.code === 200){
        this.tradeMarkList = result1.data
      }
      let result2 = await this.$api.spu.reqImage(row.id)
      if(result2.code === 200){
        result2.data.forEach((item)=>{
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImage = result2.data
      }
      let result3 = await this.$api.spu.reqBaseSaleAttrList()
      if(result3.code === 200){
        this.saleAttr = result3.data
      }
    },
    handleSuccess(response, file, fileList){
      this.spuImage = fileList
    },
    addSaveAttr(){
      const [spuId,saleAttrName] = this.attrID.split(':')
      const obj = {saleAttrName,spuId,spuSaleAttrValueList:[]}
      this.spu.spuSaleAttrList.push(obj)
    },
    showInput(row) {
      this.$set(row,'inputVisible',true)
      this.$set(row,'saleAttrValueName','')
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      })
    },
    handleInputConfirm(row) {
      let inputValue = row.saleAttrValueName;
      let baseSaleAttrId = row.spuId
      if (inputValue) {
        row.spuSaleAttrValueList.push({baseSaleAttrId,saleAttrValueName:inputValue});
      }
      row.inputVisible = false;
    },
    async addOrUpdate(){
      this.spuImage.forEach((item)=>{
        item.imgName = item.name
        item.imgUrl = item.response && item.response.data
      })
      this.spu.spuImageList = this.spuImage
      let result = await this.$api.spu.updateSpu(this.spu)
      if(result.code === 200){
        this.spuImage = []
        this.$message('保存成功')
        this.$emit('showWhat',1)
      }
    },
    async addSpuData(id){
      // this.spuImage = []
      this.spu.category3Id = id
      // const clear = {spuName: '',tmId: 0,description: '',spuImageList: [],spuSaleAttrList: [],id: undefined}
      // this.spu = Object.assign(this.spu,clear)
      let result1 = await this.$api.spu.reqTrademark()
      if(result1.code === 200){
        this.tradeMarkList = result1.data
      }
      let result3 = await this.$api.spu.reqBaseSaleAttrList()
      if(result3.code === 200){
        this.saleAttr = result3.data
      }
    }
  },
};
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>