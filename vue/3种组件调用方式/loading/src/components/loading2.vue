<template>
    <div class="loading">
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div class="text">{{text}}</div>
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
 ul, li{margin: 0;padding: 0;list-style: none;}
.loading{position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);line-height: 28px;}
ul{overflow: hidden;width: 80px;margin: 0 auto;}
.text{clear: both; text-align: center;}
li{float: left; height: 40px; width: 4px;margin-right: 4px;background: -webkit-gradient(linear, 0 0, 0 bottom, from(red), to(blue));
    animation: loading 1500ms -1500ms linear infinite alternate;
}
li:nth-child(10){animation-delay: -150ms;}
li:nth-child(9){animation-delay: -300ms;}
li:nth-child(8){animation-delay: -450ms;}
li:nth-child(7){animation-delay: -600ms;}
li:nth-child(6){animation-delay: -750ms;}
li:nth-child(5){animation-delay: -900ms;}
li:nth-child(4){animation-delay: -1050ms;}
li:nth-child(3){animation-delay: -1200ms;}
li:nth-child(2){animation-delay: -1350ms;}
li:last-child{margin: 0;}
@keyframes loading{
    0%{transform: scale(1, 1);}
    100%{transform: scale(1, -1);}
}
</style>
