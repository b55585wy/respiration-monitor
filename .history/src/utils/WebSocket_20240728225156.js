// src/utils/webSocket.js
export default {
  socket: null,
  connect(callback) {
    this.socket = new WebSocket('ws://localhost:8765');
    this.socket.onopen = () => console.log('WebSocket connected');
    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      setTimeout(() => this.connect(callback), 3000); // Reconnect attempt after 3 seconds
    };
    callback(this.socket);
  },
  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  },
};
