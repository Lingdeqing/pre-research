import Vue from 'vue'
import Loading from './components/loading.js'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Loading);

new Vue({
  render: h => h(App),
}).$mount('#app')
