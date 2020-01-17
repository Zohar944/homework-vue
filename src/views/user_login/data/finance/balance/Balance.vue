<template>
  <div>
    今日消费状况：
    <el-tag type="info">收入：
    {{this.income}}
    </el-tag>
    <el-tag type="danger">支出：
    {{this.expenditure}}
    </el-tag>
  </div>
</template>

<script>
  export default {
    name: "Balance",
    data() {
      return {
        today: new Date(),
        income: 0,
        expenditure: 0
      }
    },
    mounted() {
      this.funBalance()
    },
    methods: {
      funBalance() {
        this.$axios({
          method: 'post',
          url: 'http://localhost:8081/finance/financeDataQuery',
          data: this.qs.stringify({    //这里是发送给后台的数据
            userId: sessionStorage.getItem('userId'),
            dateId: this.today.getFullYear()+"-"+this.today.getMonth()+1+"-"+this.today.getDate()
          })
        }).then((response) => {//这里使用了ES6的语法
          if (response) {
            for (let a = 0; a < response.data.data.length; a++) {
              if (response.data.data[a].financeType == "支出") {
                this.expenditure = this.expenditure + parseInt(response.data.data[a].how)
              }
              else if(response.data.data[a].financeType == "收入"){
                this.income = this.income + response.data.data[a].how
              }
            }
          } else {
            alert("操作数据库失败")
          }
        }).catch((error) => {
          alert('请求服务器失败！！')       //请求失败返回的数据
        })

      }
    }
  }
</script>

<style scoped>
</style>
