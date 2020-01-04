<template>
    <el-table
      :data="userFinanceData">
      <el-table-column
        prop="source"
        label="第三方软件源">
      </el-table-column>
      <el-table-column
        prop="how"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="dateTime"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="project"
        label="商家">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="financeType"
        label="收入/支出">
      </el-table-column>
    </el-table>
</template>

<script>
  export default {
    name: "FinanceData",
    data() {
      return {
        user: {
          userId: 1
        },
        userFinanceData: []
      }
    }
    ,
    mounted() {
      this.financeData()
    }
    ,
    methods: {
      financeData() {
        this.$axios({
          method: 'post',
          url: '/newFinanceData',
          data: this.qs.stringify({    //这里是发送给后台的数据
            userId: sessionStorage.getItem("userId")
          })
        }).then((response) => {//这里使用了ES6的语法
          if (response) {
            for (let y in response.data.data) {
              this.userFinanceData.push(response.data.data[y])
            }
          }
        })
      }


    }
  }
</script>

<style scoped>

</style>
