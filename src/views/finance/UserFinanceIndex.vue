<!--记账首页-->
<template>
  <div>
    <div v-if="this.isStatus === false">
      <div class="flaot-class">
        <el-form>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple selectClass">
                <el-date-picker
                  v-model="monthValue.table"
                  type="month"
                  style="width: 134px;height: 36px"
                >
                </el-date-picker>
                月
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{nowTimes.hou}}:{{nowTimes.min}}:{{nowTimes.sec}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple" v-if="finance && finance.financeName ">{{finance.financeName}}</div>
              <div class="grid-content bg-purple" v-else>您好呀，我的朋友</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple" v-if="finance && finance.financeName " @click="cancel">
                注销
              </div>
              <div class="grid-content bg-purple" v-else @click="login">请登录</div>
            </el-col>
          </el-row>
          <DateCalendar @isStatus="funStatus" :month="monthValue.table"
                        v-if="finance && finance.financeName"></DateCalendar>
          <div :month="monthValue.table" v-else>
            <NoLogin></NoLogin>
          </div>
        </el-form>
      </div>
      <div>
        <UserData style="width: 100%"></UserData>
        <div v-if="finance && finance.financeName">
          <FinanceData style="width: 50%"></FinanceData>
        </div>
        <div v-else>亲，要看的话，请您先登录哦</div>
      </div>
    </div>
    <DateFinance v-else></DateFinance>
  </div>
</template>

<script>
  import DateCalendar from '../date/DateCalendar'
  import UserData from "../user_login/data/UserData";
  import NoLogin from "../date/no_login/NoLogin";
  import FinanceData from "../user_login/data/finance/FinanceData";
  import DateFinance from "./date_finance/DateFinance";

  export default {
    name: 'UserFinanceIndex',
    components: {DateFinance, FinanceData, NoLogin, UserData, DateCalendar},
    inject: ['reload'],
    data() {
      return {
        isStatus: false,
        monthValue: {
          table: new Date()
        },
        finance: {
          financeName: sessionStorage.getItem('userName'),
        },
        nowTimes: {
          yy: new Date().getFullYear(),
          mm: new Date().getMonth(),
          dd: new Date().getDate(),
          hou: new Date().getHours(),
          min: new Date().getMinutes(),
          sec: new Date().getSeconds()
        }
      }
    },
    props: ['isstatus'],
    watch: {
      'isstatus': function (val) { //监听props中的属性
        this.isStatus = val
      }
    },
    mounted() {
      setInterval(() => {
        this.setNowTimes()
      }, 1000)//挂载vue后进行每秒时间的更新
    },
    methods: {
      funStatus(value) {
        if (value === false) {
          // console.log(value)
          this.$emit("status", true)
        }
        this.isStatus = value
      },
      cancel() {
        sessionStorage.clear()
        this.reload()
      },
      setNowTimes() {
        let myDate = new Date()
        this.nowTimes.yy = myDate.getFullYear()
        this.nowTimes.mm = myDate.getMonth() + 1
        this.nowTimes.dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
        this.nowTimes.hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
        this.nowTimes.min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
        this.nowTimes.sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
      },
      login() {
        this.$router.push('/')
      },

    }

  }
</script>

<style>
  .bg-purple {
    background-color: rgba(72, 209, 204, 0.75);
    color: whitesmoke;
    border-radius: 4px;
    min-height: 36px;
  }

  .grid-content {
    color: whitesmoke;
    border-radius: 4px;
    min-height: 36px;
  }

  .selectClass .el-select {
    width: 80px;
  }

  .flaot-class {
    width: 50%;
    float: left;
  }
</style>
