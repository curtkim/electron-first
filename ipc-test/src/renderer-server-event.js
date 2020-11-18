import { Observable } from 'rxjs'

export function connect_server_events(headers){
  ipcRenderer.send('se-connect', headers)
}
export function close_server_events(){
  ipcRenderer.send('se-close')
}
export function send_server_event(msg){
  ipcRenderer.send('se-send', msg)
}
export function create_server_event_observable(){
  return Observable.create(function(observer) {

    ipcRenderer.on('se-message', (event, msg) => {
      observer.next(msg)
    })
  
    return () => {
      close_server_events()
    }
  })
}
