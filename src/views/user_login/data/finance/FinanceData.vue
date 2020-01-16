<template>
  <el-table
    :header-cell-style="bgColor"
    :data="userFinanceData">
    <el-table-column
      prop="source"
      label="第三方软件源"
    >
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
          userId: ""
        },
        userFinanceData: [],
      }
    },

    mounted() {
      this.financeData()
    }
    ,
    methods: {
      financeData() {
        this.$axios({
          method: 'post',
          url: 'http://localhost:8081/finance/newFinanceData',
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
      },
      bgColor({row, column, rowIndex, columnIndex}) {
        if (rowIndex === 0) {
          return 'background-color: rgba(72, 209, 204, 0.65);color: whitesmoke;border-radius: 4px;min-height: 36px;'
        }
        return ''
      }
    }
  }
</script>

<style scoped>
  /*.el-table >>> .bg-purple {*/
  /*   background-color:rgba(72, 209, 204, 0.75);*/
  /* }*/
</style>
