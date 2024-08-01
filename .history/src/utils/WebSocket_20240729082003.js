// src/utils/webSocket.js
export default {
  socket: null,
  connect(callback) {
    this.socket = new WebSocket('wss://localhost:8765');  // 连接到 WebSocket 服务器
    this.socket.onopen = () => console.log('WebSocket connected');  // 连接打开时的日志
    this.socket.onclose = () => {
      console.log('WebSocket disconnected');  // 连接关闭时的日志
      setTimeout(() => this.connect(callback), 3000);  // 3 秒后重新连接
    };
    callback(this.socket);  // 执行传入的回调函数，传递 WebSocket 对象
  },
  disconnect() {
    if (this.socket) {
      this.socket.close();  // 关闭 WebSocket 连接
    }
  },
};
