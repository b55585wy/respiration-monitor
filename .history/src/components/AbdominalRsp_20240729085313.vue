<template>
  <div class="app-container">
    <header class="app-header">
      <button @click="closeApp">关闭</button>
      <span>腹式呼吸</span>
      <button @click="openSettings">⚙️</button>
    </header>
    <main class="app-main">
      <div class="timer-section">
        <div class="label">时间</div>
        <div class="timer-display">00:00:00</div>
        <div class="label">呼吸曲线</div>
      </div>
      <div class="heart-rate-section">
        <div class="label">心率</div>
        <div class="heart-rate">76</div>
      </div>
    </main>
    <footer class="app-footer">
      <button class="footer-button">
        <span>Band Force</span>
      </button>
      <button class="footer-button">
        <span>Vital Signs</span>
        <span class="heart-rate-badge">76</span>
      </button>
      <button class="footer-button">
        <span>Music</span>
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'BreathingApp',
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
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
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
