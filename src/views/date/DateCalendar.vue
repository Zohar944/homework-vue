<template>
  <div>
    <el-calendar v-model="value"
                 :default-data="defaultData"
    >
<!--      <template slot="dateCell" slot-scope="{ date, data }">-->
<!--        <div class="date-cell" :class="data.isSelected ? setData(data.date) :''">-->
<!--          <div class="calendar-day">-->
<!--            {{-->
<!--            data.day-->
<!--            .split('-')-->
<!--            .slice(2)-->
<!--            .join('-')-->
<!--            }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->
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
      setData(data){
        this.defaultData=data
      }
    }
  }
</script>

<style>
  .date-color {
    color: goldenrod;
  }
</style>
