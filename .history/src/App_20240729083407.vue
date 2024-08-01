<template>
  <div id="app">
    <LineChart :chart-data="chartData" />  
  </div>
</template>

<script>
import LineChart from './components/LineChart.vue';
import Abdominal
import { ref } from 'vue';

export default {
  components: {
    LineChart
  },
  setup() {
    // 初始化图表数据
    const chartData = ref({
      labels: [],
      datasets: [{
        label: 'Respiration Waveform',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      }]
    });

    return {
      chartData
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
