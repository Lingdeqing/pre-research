<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Dialog title="登陆弹窗" :visible.sync="visible">
      <form class="form">
        <div class="form__item">
          <label>用户名: </label><input type="text" ref="username"/>
        </div>
        <div class="form__item">
          <label>密码: </label><input type="password"/>
        </div>
      </form>
      <div slot="footer" class="footer">
        <button type="button" @click="visible = false">取消</button>
        <button type="button" @click="visible = false">确定</button>
      </div>
    </Dialog>
    <button type="button" @click="open">打开弹窗</button>
  </div>
</template>

<script>
import Dialog from './components/dialog.vue'

export default {
  name: 'app',
  data(){
    return {
      visible: true
    }
  },
  methods: {
    open(){
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.username.focus();
      })
    }
  },
  components: {
    Dialog
  }
}
</script>

<style scoped>
.form__item{display: flex;margin-top: 5px;}
.form__item:first-child{margin-top: 0;}
.form__item label{margin-right: 5px;  width: 4em;text-align: right;}
.form__item input{flex: 1;}
.footer{display: flex;height: 100%; justify-content: center;align-items: center;}
.footer button{margin-left: 10px;}
</style>
