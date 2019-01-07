<template>
  <div v-if="visible" class="loading">
    <div class="sk-wave">
      <div class="sk-rect sk-rect1"></div>
      <div class="sk-rect sk-rect2"></div>
      <div class="sk-rect sk-rect3"></div>
      <div class="sk-rect sk-rect4"></div>
      <div class="sk-rect sk-rect5"></div>
    </div>
    <div class="loading__text" v-if="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data(){
    return {
      text: '2323',
      visible: true
    }
  },
  methods: {
    setText(text){
      this.text = text;
    }
  }
}
</script>

<style scoped>
.loading{position: absolute;left: 50%;top: 50%;margin: -30px 0 0 -95px;text-align: center;    width: 190px;height: 60px;line-height: 20px;color: #000;}
.loading__text{text-align: center;}
.sk-wave {
  display: inline-block;
  vertical-align: top;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px; }
  .sk-wave .sk-rect {
    background-color: #333;
    height: 100%;
    width: 6px;
    display: inline-block;
    vertical-align: top;
    margin-right: 5px;
    -webkit-animation: sk-waveStretchDelay 1.2s infinite ease-in-out;
            animation: sk-waveStretchDelay 1.2s infinite ease-in-out; }
  .sk-wave .sk-rect:last-child{margin: 0;}
  .sk-wave .sk-rect1 {
    -webkit-animation-delay: -1.2s;
            animation-delay: -1.2s; }
  .sk-wave .sk-rect2 {
    -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s; }
  .sk-wave .sk-rect3 {
    -webkit-animation-delay: -1s;
            animation-delay: -1s; }
  .sk-wave .sk-rect4 {
    -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s; }
  .sk-wave .sk-rect5 {
    -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s; }

@-webkit-keyframes sk-waveStretchDelay {
  0%, 40%, 100% {
    -webkit-transform: scaleY(0.4);
            transform: scaleY(0.4); }
  20% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1); } }

@keyframes sk-waveStretchDelay {
  0%, 40%, 100% {
    -webkit-transform: scaleY(0.4);
            transform: scaleY(0.4); }
  20% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1); } }
</style>
