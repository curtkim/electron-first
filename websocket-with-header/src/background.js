'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const { ipcMain } = require('electron')
const path = require('path')

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }


  /*
  var i = 0;
  setInterval(function(){
    console.log(i);
    win.webContents.send('my-ipc', "" + i++)
  }, 1000)
  */

 var WebSocketClient = require('websocket').client;

 var client = new WebSocketClient();
 
 client.on('connectFailed', function(error) {
     console.log('Connect Error: ' + error.toString());
 });
 
 client.on('connect', function(connection) {
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
          win.webContents.send('my-ipc', message.utf8Data)
        }
     });
 
     /*
     function sendNumber() {
         if (connection.connected) {
             var number = Math.round(Math.random() * 0xFFFFFF);
             connection.sendUTF(number.toString());
             setTimeout(sendNumber, 1000);
         }
     }
     sendNumber();
     */
 });
 
 client.connect('ws://localhost:8080/', 'echo-protocol');  
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
