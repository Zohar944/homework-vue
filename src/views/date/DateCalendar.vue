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
    name: 'DateCalendar',
    data () {
      return {
        value: new Date(),
        yearData: '',
        monthData: '',
        dateData: ''
      }
    },
    props: ['month'],
    watch: {
      'month': function (val) { //监听props中的属性
        this.value = val
      }
    },
    methods: {
      dateFinance () {
        this.yearData =this.value.getFullYear()
        this.monthData=this.value.getMonth()
        this.dateData=this.value.getDate()

      }
    }
  }
</script>

<style>
  .date-color {
    color: goldenrod;
  }
</style>
