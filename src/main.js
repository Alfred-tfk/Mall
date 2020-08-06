import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//事件总线给$bus赋值vue实例
Vue.prototype.$bus=new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
