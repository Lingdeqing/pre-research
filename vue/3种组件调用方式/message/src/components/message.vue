<template>
  <div class="message">{{message}}</div>
</template>

<script>
export default {
  name: 'message',
  data(){
    return {
      message: ''
    }
  },
  mounted(){
    setTimeout(() => {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }, 3000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message{padding: 10px;background: #f0f9eb;border:1px solid #e1f3d8;color: #67c23a; }
</style>
