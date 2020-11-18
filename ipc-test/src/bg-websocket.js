import { ipcMain } from 'electron'
import { client as WebSocketClient } from "websocket"


export default function prepare_server_event_websocket(renderer){ 
  const client = new WebSocketClient()
  let conn = null
  
  client.on('connectFailed', function(error) {
      console.log('Connect Error: ' + error.toString());
  });
   
  client.on('connect', function(connection) {
    conn = connection
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
      console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
      console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
      if (message.type === 'utf8') {
        console.log("Received: '" + message.utf8Data + "'");
        renderer.send('se-message', JSON.parse(message.utf8Data))
      }
    });
  });
  

  ipcMain.on('se-connect', (event, data) => {
    if( conn != null){
      console.log('close already opened');
      conn.close()
    }
    const {url, headers}

    console.log('se-connect', headers)
    client.connect(url, null, null, headers, null)
  })
  
  ipcMain.on('se-close', (event) => {
    conn.close()
  })
  
  ipcMain.on('se-send', (event, msg) => {
    if( conn != null)
      conn.sendUTF(JSON.stringify(msg))
    else
      console.log('conn is null and ignore msg')
  })
  
}
