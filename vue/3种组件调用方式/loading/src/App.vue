<template>
  <div id="app">
    <button @click="showLocal">显示局部</button>
    <button @click="showFullscreen">全屏加载</button>
    <input type="text" v-model="text"/>
    <div v-if="localVisible" v-loading="loading" :loading-text="text" class="local" key="local">局部</div>
    <div v-if="fullVisible" v-loading.fullscreen="loading" :loading-text="text" class="fullscreen" key="full">全屏</div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      loading: true,
      text: '正在加载中',
      localVisible: false,
      fullVisible: false,
    }
  },
  methods: {
    showLocal(){
      this.localVisible = true;
      this.fullVisible = false;
    },
    showFullscreen(){
      this.localVisible = false;
      this.fullVisible = true;
    }
  }
}
</script>

<style>
*{margin: 0;padding: 0;}
.local{height: 150px;line-height: 150px;text-align: center;background: pink;color: #fff;margin-bottom: 10px;}
.fullscreen{height: 150px;line-height: 150px;text-align: center;background: pink;color: #fff;}
html, body{height: 100%;}
</style>
