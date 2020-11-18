import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

console.log('init done')

/*
ipcRenderer.on('my-ipc', (event, msg) => {
  console.log(msg)
})

setInterval(function(){
  ipcRenderer.send('to-main', ['ping'])
}, 1000)
*/

import {connect_server_events, close_server_events, send_server_event, create_server_event_observable} from './renderer-server-event'
const serverEvent$ = create_server_event_observable()

const subscribe = serverEvent$.subscribe(val => console.log(val));

const headers = {
  AUTH: 'hello'
}

setTimeout(function(){
  connect_server_events({url:'ws://localhost:8080', headers})
}, 1000)
setTimeout(function(){
  send_server_event({
    lat: 37.392713, 
    lng: 127.110471, 
    update_time: new Date().getTime() 
  })
}, 4000)
setTimeout(function(){
  close_server_events()
}, 10000)

setTimeout(function(){
  console.log("reconnect")
  connect_server_events({url:'ws://localhost:8080', headers})
}, 12000)
setTimeout(function(){
  console.log("reclose")
  close_server_events()
}, 20000)
