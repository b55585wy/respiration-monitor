<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>  
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import webSocket from '../utils/webSocket.js';

// 注册 Chart.js 的所有组件
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
    const canvasRef = ref(null);  // 用于引用画布元素
    const chart = ref(null);  // 用于引用 Chart.js 图表实例

    // 连接 WebSocket 并处理接收到的数据
    const connectWebSocket = () => {
      webSocket.connect((websocket) => {
        websocket.onmessage = (event) => {
          const { timestamp, value } = JSON.parse(event.data);  // 解析接收到的数据
          
          if (chart.value) {
            chart.value.data.labels.push(timestamp);  // 将时间戳添加到 labels
            chart.value.data.datasets.forEach((dataset) => {
              dataset.data.push(value);  // 将值添加到数据集中
            });
            chart.value.update();  // 更新图表
          } else {
            console.error('Chart is not defined');  // 若图表未定义，打印错误
          }
        };
      });
      debugger
    };

    // 在组件挂载时初始化 Chart.js 和 WebSocket 连接
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
        connectWebSocket();  // 初始化 WebSocket 连接
      }
    });

    // 在组件卸载时销毁图表和 WebSocket 连接
    onUnmounted(() => {
      if (chart.value) {
        chart.value.destroy();  // 销毁图表实例
      }
      webSocket.disconnect();  // 断开 WebSocket 连接
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
