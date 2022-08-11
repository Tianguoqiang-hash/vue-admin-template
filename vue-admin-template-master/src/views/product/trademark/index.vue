<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="showDialog">添加</el-button>
    <el-dialog :title="tradeMarkForm.id?'编辑品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <el-form :model="tradeMarkForm" :rules="rules" ref="tmForm">
        <el-form-item label="品牌名称" label-width="100px" style="width: 60%" prop="tmName">
          <el-input autocomplete="off" v-model="tradeMarkForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tradeMarkForm.logoUrl" :src="tradeMarkForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="records.records" style="width: 100%">
      <el-table-column label="序号" width="80%" type="index"> </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template v-slot:default="scope">
          <img style="width: 50px; height: 50px" :src="scope.row.logoUrl" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template v-slot="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="update(scope.row)">编辑</el-button>
          <el-button type="warning" size="mini" icon="el-icon-delete" @click="moveTradeMark(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="textAlign: center"
      layout="prev, pager, next,  jumper, ->, sizes, total"
      :total="records.total"
      :current-page="records.current"
      :page-sizes="[4, 5, 6, 7]"
      :pager-count="5"
      :page-size="records.size"
      @current-change="getTradeMark"
      @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "trademark",
  data() {
    return {
      limit: 3,
      records: {},
      dialogFormVisible: false,
      tradeMarkForm: {
        tmName: '',
        logoUrl: '',
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌logo', trigger: 'change' }
        ],
      }
    };
  },
  mounted() {
    this.getTradeMark();
  },
  methods: {
    async getTradeMark(page = 1) {
      const result = await this.$api.tradeMark.reqTradeMark(page, this.limit);
      this.records = result.data;
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getTradeMark();
    },
    handleAvatarSuccess(res, file) {
        this.tradeMarkForm.logoUrl = res.data
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    addOrUpdate(){
      this.$refs.tmForm.validate(async (success)=>{
        if(success) {
          this.dialogFormVisible = false
          let result = await this.$api.tradeMark.addOrUpdate(this.tradeMarkForm)
          if(result.code === 200){
            this.$message(this.tradeMarkForm.id?'修改品牌成功':'添加品牌成功')
            this.getTradeMark(this.tradeMarkForm.id?this.records.current:1)
          }
        } else {
          console.log('error submit!!');
          return false
        }
      })
    },
    showDialog(){
      this.tradeMarkForm = {tmName:'',logoUrl:''}
      this.dialogFormVisible = true
    },
    update(row){
      this.dialogFormVisible = true
      this.tradeMarkForm = {...row}
    },
    moveTradeMark(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await this.$api.tradeMark.moveTradeMark(id)
          if(result.code === 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getTradeMark(this.records.current)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>