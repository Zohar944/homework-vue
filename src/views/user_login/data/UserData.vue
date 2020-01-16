<template>
  <div>
    <diV @click="userInfo">
      <el-avatar :size="150"
                 src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575293905837&di=f2b5cf956477077612c772ec459a32e2&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201510%2F06%2F20151006213544_dCZat.thumb.700_0.jpeg"></el-avatar>
    </diV>
    <div>余额：</div>
    <div>鱼塘投资===></div>
    <div>
      <CsvUpload></CsvUpload>
    </div>
  </div>
</template>

<script>
  import CsvUpload from "./function/CsvUpload";

  export default {
    name: "UserData",
    data() {
      return {}
    },
    methods: {
      userInfo() {
        console.log("sas")
        this.$router.push("/views/user_login/user")
      }
    },
    components: {CsvUpload}
  }
</script>

<style scoped>

</style>
