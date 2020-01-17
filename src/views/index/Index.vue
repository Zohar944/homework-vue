<template>
  <div>
    <el-button class="el-icon-notebook-1 bg-purple" @click="funButton('startPage')">开始</el-button>
    <el-button class="el-icon-user bg-purple" @click="funButton('friend')">好友</el-button>
    <el-button class="el-icon-edit bg-purple" @click="funButton('edit')">编辑</el-button>
    <UserFinanceIndex v-bind:isstatus="isTrue" @status="funWho" v-if="this.isWho === 'startPage'"></UserFinanceIndex>
    <Firend v-else-if="this.isWho === 'friend'"></Firend>
    <UserInfo v-else-if="this.isWho ==='edit'"></UserInfo>
  </div>
</template>

<script>
  import UserFinanceIndex from "../finance/UserFinanceIndex";
  import UserInfo from "../user_login/user/UserInfo";
  import Firend from "../user_login/friend/Friend";
  import DateFinance from "../finance/date_finance/DateFinance";

  export default {
    name: "Index",
    components: {DateFinance, Firend, UserInfo, UserFinanceIndex},
    data() {
      return {
        isTrue: "",
        isWho: "startPage"
      }
    },
    methods: {
      funWho(value) {//子组件传值到父组件  UserFinanceIndex => Index
        this.isTrue = value
      },
      funButton(value) {
        if (value === "startPage") {
          if (this.isTrue === true) {
            this.isTrue = false //父组件传值到子组件  Index => UserFinanceIndex
          }
          this.isWho = value
        } else {
          this.isWho = value
        }
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
