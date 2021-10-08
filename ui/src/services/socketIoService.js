import { io } from 'socket.io-client';

import store from '../store'

class SocketIOService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    
    this.socket.on('notification', (data) => {
      if (data.text) {
        store.dispatch('addMessage', data.text);
      }
    });
  }

  disconnect() {
    if(this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketIOService();
