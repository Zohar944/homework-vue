<template>
  <div>
    <el-table
      :header-cell-style="bgColor"
      :data="dateFinance">
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
  </div>
</template>

<script>
  export default {
    name: "DateFinance",
    data() {
      return {
        dateFinance: [],
      }
    },
    mounted() {
      this.userDateFinanceQuery()
    },
    methods: {
      userDateFinanceQuery() {
        this.$axios({
          method: 'post',
          url: 'http://101.200.219.156:80/api/finance/financeDataQuery',
          data: this.qs.stringify({    //这里是发送给后台的数据
            userId: sessionStorage.getItem("userId"),
            dateId: sessionStorage.getItem("userDateFinance")
          })
        }).then((response) => {//这里使用了ES6的语法
          if (response) {
            for (let y in response.data.data) {
              this.dateFinance.push(response.data.data[y])
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
  .bg-purple {
    background-color: rgba(72, 209, 204, 0.75);
    color: whitesmoke;
    border-radius: 4px;
    min-height: 36px;
  }
</style>
