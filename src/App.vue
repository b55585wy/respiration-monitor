<template>
  <div class="phone-frame">
    <div class="app-container">
      <header class="app-header">
        <button @click="closeApp">关闭</button>
        <span>腹式呼吸</span>
        <button @click="openSettings">⚙️</button>
      </header>
      <main class="app-main">
        <div class="timer-section">
          <div class="label">时间</div>
          <div class="timer-display">{{ formattedTime }}</div>
          <div class="label">呼吸曲线</div>
          <canvas ref="breathingCanvas" width="300" height="100"></canvas>
        </div>
        <div class="heart-rate-section">
          <div class="label">心率</div>
          <div class="heart-rate">{{ heartRate }}</div>
          <div class="button-container">
            <button class="start-button" @click="toggleTimer">{{ isRunning ? '暂停' : '开始' }}</button>
            <button v-if="time > 0" class="cancel-button" @click="resetTimer">取消</button>
          </div>
        </div>
      </main>
      <footer class="app-footer">
        <button class="footer-button">
          <span>个性化</span>
        </button>
        <button class="footer-button">
          <span>身体实况</span>
          <span class="heart-rate-badge">{{ heartRate }}</span>
        </button>
        <button class="footer-button">
          <span>播客</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'BreathingApp',
  setup() {
    const time = ref(0);
    const isRunning = ref(false);
    const heartRate = ref(76);
    let timerInterval = null;
    let heartRateInterval = null;
    let breathingCanvasContext = null;
    let animationFrameId = null;

    const startTimer = () => {
      timerInterval = setInterval(() => {
        time.value++;
      }, 1000);

      heartRateInterval = setInterval(() => {
        heartRate.value = 76 + Math.floor(Math.random() * 10) - 5;
      }, 1000);
    };

    const stopTimer = () => {
      clearInterval(timerInterval);
      clearInterval(heartRateInterval);
      cancelAnimationFrame(animationFrameId);
    };

    const toggleTimer = () => {
      if (isRunning.value) {
        stopTimer();
      } else {
        startTimer();
        drawBreathingWave();
      }
      isRunning.value = !isRunning.value;
    };

    const resetTimer = () => {
      stopTimer();
      time.value = 0;
      isRunning.value = false;
    };

    const formattedTime = computed(() => {
      const hours = String(Math.floor(time.value / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((time.value % 3600) / 60)).padStart(2, '0');
      const seconds = String(time.value % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    });

    const drawBreathingWave = () => {
      const canvas = breathingCanvasContext;
      const context = canvas.getContext('2d');
      let x = 0;
      const waveAmplitude = 20;
      const waveFrequency = 0.05;
      const waveSpeed = 2;

      const draw = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(0, canvas.height / 2);

        for (let i = 0; i < canvas.width; i++) {
          const y = waveAmplitude * Math.sin(waveFrequency * (i + x)) + canvas.height / 2;
          context.lineTo(i, y);
        }

        context.strokeStyle = '#4caf50';
        context.stroke();

        x += waveSpeed;
        animationFrameId = requestAnimationFrame(draw);
      };

      draw();
    };

    onMounted(() => {
      breathingCanvasContext = document.querySelector('canvas');
    });

    onBeforeUnmount(() => {
      stopTimer();
    });

    return {
      formattedTime,
      toggleTimer,
      resetTimer,
      isRunning,
      time,
      heartRate
    };
  },
  methods: {
    closeApp() {
      console.log('App closed');
      // Add your close app logic here
    },
    openSettings() {
      console.log('Settings opened');
      // Add your open settings logic here
    }
  }
};
</script>

<style scoped>
.phone-frame {
  width: 375px; /* iPhone X width */
  height: 812px; /* iPhone X height */
  border: 16px solid black;
  border-radius: 36px;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  text-align: center;
}

.app-header,
.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.app-header button,
.app-footer button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 添加此行使其子元素水平居中 */
}

.timer-section,
.heart-rate-section {
  margin-bottom: 20px;
}

.label {
  font-size: 14px;
  color: #666;
}

.timer-display {
  font-size: 48px;
  font-weight: bold;
}

.heart-rate {
  font-size: 48px;
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* 按钮之间的间距 */
  margin-top: 20px;
}

.start-button {
  width: 60px;
  height: 60px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cancel-button {
  width: 60px;
  height: 60px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-footer .footer-button {
  background: none;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.heart-rate-badge {
  background: #ff0000;
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  margin-left: 5px;
}
</style>
