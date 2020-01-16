<template>
  <div>
    <el-calendar v-model="value"
                 :default-data="defaultData"
    >
      <template slot="dateCell" slot-scope="{ date, data }"  >
        <div style="width: 100%;height: 100%" class="date-cell" :class="data.isSelected ? setData(data.date) :''" @click="outData(data.day)">
              {{
              data.day
              .split('-')
              .slice(2)
              .join('-')
              }}

        </div>
      </template>

    </el-calendar>
  </div>
</template>

<script>

  export default {
    name: 'DateCalendar',
    data() {
      return {
        value: new Date(),
        defaultData: "",
        yearData: '',
        monthData: '',
        dateData: '',
      }
    },

    props: ['month'],
    watch: {
      'month': function (val) { //监听props中的属性
        this.value = val
      }
    },
    methods: {
      setData(data) {
        this.defaultData = data
      },
      outData(day) {
        this.$emit("isStatus",false)
        sessionStorage.setItem("userDateFinance",day)
      }
    }
  }
</script>

<style>
  .date-color {
    color: goldenrod;
  }
</style>
