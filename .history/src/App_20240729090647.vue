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
        </div>
        <div class="heart-rate-section">
          <div class="label">心率</div>
          <div class="heart-rate">76</div>
          <button class="start-button" @click="startTimer">开始</button>
        </div>
      </main>
      <footer class="app-footer">
        <button class="footer-button">
          <span>Band Force</span>
        </button>
        <button class="footer-button">
          <span>实kuang</span>
          <span class="heart-rate-badge">76</span>
        </button>
        <button class="footer-button">
          <span>播客</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'BreathingApp',
  setup() {
    const time = ref(0);
    const isRunning = ref(false);

    const startTimer = () => {
      if (!isRunning.value) {
        isRunning.value = true;
        setInterval(() => {
          time.value++;
        }, 1000);
      }
    };

    const formattedTime = computed(() => {
      const hours = String(Math.floor(time.value / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((time.value % 3600) / 60)).padStart(2, '0');
      const seconds = String(time.value % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    });

    return {
      formattedTime,
      startTimer
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

.start-button {
  margin-top: 20px;
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
