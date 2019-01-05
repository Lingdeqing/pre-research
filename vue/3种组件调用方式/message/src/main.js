import Vue from 'vue'
import Message from './components/message.js';
import App from './App.vue'

Vue.use(Message);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
