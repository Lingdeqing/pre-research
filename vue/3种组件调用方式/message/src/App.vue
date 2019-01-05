<template>
  <div id="app">
    <button type="button" @click="showMessage">显示消息</button>
  </div>
</template>

<script>
import Message from './components/message.vue'

export default {
  name: 'app',
  components: {
    Message
  },
  methods: {
    showMessage(){
      this.$message('hahahaha')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
