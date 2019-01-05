<template>
  <div class="dialog" v-show="visible">
    <div class="dialog__modal" @click="close"></div>
    <div class="dialog__wrap">
      <div class="dialog__header">
        <slot name="header">{{title}}</slot>
      </div>
      <div class="dialog__body">
        <slot></slot>
      </div>
      <div class="dialog__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mi-dialog',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '弹窗'
    }
  },
  methods:{
    close(){
      this.$emit('update:visible', false);
    }
  }
}
</script>

<style scoped>
.dialog{display: flex; justify-content: center;align-items: center; position: fixed;left: 0; right: 0;top: 0;bottom: 0;}
.dialog__modal{position: absolute;width: 100%;height: 100%;}
.dialog__wrap{position: relative; box-sizing: border-box; width: 50vw;background: #ffebd7;border-radius: 4px;}
.dialog__header{text-align: center; height: 45px;line-height: 45px;color: #fff; background: #353235;}
.dialog__footer{margin:0 10px; height: 40px;line-height: 40px;border-top: 1px solid #000;}
.dialog__body{padding: 10px;}
</style>
