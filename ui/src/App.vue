<template>
  <div>
    <div
      v-for="message in messages"
      class="field"
      :key="message"
    >
      <Notification
        v-if="message"
        :message="message"
        :type="type"
      />
    </div>
  </div>
</template>

<script>
import store from './store/index.js';
import SocketioService from './services/socketIoService.js';
import Notification from './components/Notification.vue'

export default {
  name: 'App',
  computed: {
    messages() {
      return store.state.messages;
    },
  },
  created() {
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
  components: {
    Notification,
  }
}
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
