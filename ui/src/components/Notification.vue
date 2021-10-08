<template>
    <!-- Notification Message Markup -->
    <!-- Types: info, warning, error, success -->
    <div class="ui message" style="width: 300px; margin: 0 auto; margin-bottom: 20px;" :class="getType()" v-if="!hidden">
      <i class="close icon" @click="hide"></i>
      <div class="header">
        {{message}}
      </div>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      default: 'Information',
    }
  },
  data: () => ({
    hidden: false,
  }),
  methods:{
    hide() {
      this.hidden = true
    }, 
    getType () {
      const number = ~~(Math.random() * 4);

      switch(number % 4) {
        case 0:
          return "info";
        case 1:
          return "warning";
        case 2:
          return "error";
        case 3:
          return "success";
      }
    },
  }
}
</script>
