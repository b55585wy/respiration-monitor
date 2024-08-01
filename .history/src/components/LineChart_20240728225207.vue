<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import webSocket from '../utils/webSocket.js';

Chart.register(...registerables);

export default {
  name: 'LineChart',
  props: {
    chartData: {
      type: Object,
      default: () => ({
        labels: [],
        datasets: [{
          label: 'Respiration Waveform',
          data: [],
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        }]
      }),
    },
  },
  setup(props) {
    const canvasRef = ref(null);
    const chart = ref(null);

    const connectWebSocket = () => {
      webSocket.connect((websocket) => {
        websocket.onmessage = (event) => {
          const { timestamp, value } = JSON.parse(event.data);

          if (chart.value) {
            chart.value.data.labels.push(timestamp);
            chart.value.data.datasets.forEach((dataset) => {
              dataset.data.push(value);
            });
            chart.value.update();
          } else {
            console.error('Chart is not defined');
          }
        };
      });
    };

    onMounted(() => {
      if (canvasRef.value) {
        chart.value = new Chart(canvasRef.value, {
          type: 'line',
          data: props.chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                title: {
                  display: true,
                  text: 'Time (s)'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Value'
                }
              }
            }
          },
        });
        connectWebSocket();
      }
    });

    onUnmounted(() => {
      if (chart.value) {
        chart.value.destroy();
      }
      webSocket.disconnect();
    });

    return {
      canvasRef,
    };
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
}
</style>
