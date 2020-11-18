## Main -> Renderer async
- Main 
    
    win.webContents.send('my-ipc', {i})

- Renderer

    window.ipcRenderer.on('my-ipc', (event, msg) => {
      console.log(msg)
    })

## Renderer -> Main async
- Renderer
  
    ipcRenderer.send('to-main', ['ping'])

- Main 

    ipcMain.on('to-main', (event, arg) => {
      console.log(arg)
    })


## WebsocketProxy

Renderer
- client.connect
- client.on('connectFailed')
- client.on('connect')
- connection.on('error')
- connection.on('close')
- connection.on('message')
- connection.sendUTF


  
