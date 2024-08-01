<template>
  <div id="app">
    <LineChart :chart-data="chartData" />
    <AbdominalRsp />
  </div>
</template>

<script>
import LineChart from './components/LineChart.vue';
import AbdominalRsp from './components/AbdominalRsp.vue'; // 修正拼写错误
import { ref } from 'vue';

export default {
  components: {
    LineChart,
    AbdominalRsp
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
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f5f5f5;
}

</style>
