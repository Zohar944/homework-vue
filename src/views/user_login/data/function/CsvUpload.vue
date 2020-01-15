<template>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:8081/finance/billImport"
      :data="financeInfo"
      :on-success="submitSuccess"
      :on-error="submitError"
      :on-change="changeStatus"
      accept=".csv"
      :auto-upload="false"
    >
      <el-input placeholder="选择文件" slot="trigger" size="small" type="primary" >选取文件</el-input>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传CSV文件，且不超过500kb</div>
    </el-upload>
</template>
<!--后端缺个文件暂存功能，有前端提供-->

<script>
  export default {
    name: "CsvUpload",
    data() {
      return {
        financeInfo:{
          userId:sessionStorage.getItem("userId"),
          csvPath: '',
          source: '微信支付'
        },
      }
    }, methods: {
      changeStatus(file, fileList){
        this.financeInfo.csvPath = 'F:\\VUE\\'+ file.name
          console.log(file)
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      submitSuccess(response, file, fileList){
        if(response.code == "200"){
          alert("导入数据成功！")
        }else if (response.code == "204"){
          alert("连接服务器成功，但没有新的数据")
        }
      },
      submitError(err, file, fileList){
        alert("数据导入失败，请重试！")
      }
    }
  }
</script>

<style scoped>

</style>
