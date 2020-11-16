import Vue from 'vue'
import App from './App.vue'
import { fromEvent } from 'rxjs';


const myipc$ = fromEvent(window.ipcRenderer, 'my-ipc')
myipc$.subscribe(x => console.log(x))

/*
window.ipcRenderer.on('my-ipc', (event, msg) => {
  console.log(msg)
})
*/

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
