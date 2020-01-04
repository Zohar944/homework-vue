<template>
  <div>
    <el-calendar v-model="value">
      <template slot-scope="{date, data}">
      </template>
    </el-calendar>
  </div>
</template>

<script>
  export default {
    name: "NoLogin"
  }
</script>

<style scoped>

</style>
