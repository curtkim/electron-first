import Vue from 'vue'
import App from './App.vue'

window.ipcRenderer.on('my-ipc', (event, msg) => {
  console.log(msg)
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
