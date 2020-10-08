<template>
  <div id="day-select">
    <ul class="days">
      <li v-for="day in days" v-bind:class="{day: true, active:isActive(day)}" v-on:click="selectedDay(day)">{{ formatDay(day) }}</li>
      <li class="day-selector">
          <span class="dec" v-on:click="changeDay(-1)"></span>
          <span class="inc" v-on:click="changeDay(+1)"></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    props:['selected'],
  data() {
    return {
        //selected: this.$moment(),
      days: [0, 1, 2, 3, 4, 5, 6].map((num) => this.$moment().add(num, "days")),
    };
  },
  methods: {
    formatDay(day) {
      if (day.isSame(this.$moment(), "day")) {
        return "Today";
      } else {
        return day.format("ddd DD/MM");
      }
    },
    isActive(day){
    if (day.isSame(this.selected, "day")) {
        return true;
      } else {
        return false;
      }
    },
    selectedDay(day){
        this.$bus.$emit('set-day',day)
    },
    changeDay(change){
        let newDay = this.$moment(this.selected).add(change,'days')
        if(this.days.find(day => newDay.isSame(day,'days')))
            this.selectedDay(newDay)
    }
  },
};
</script>