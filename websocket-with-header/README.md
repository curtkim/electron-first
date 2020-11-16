## outline
- background에서 websocket을 연결하고, 받은 내용을 win.webContents.send으로 rednerer에 보낸다.
- renderer에서는 ipcRenderer.on으로 받는다.

## notes
- main.js에서 ipcRenderer를 사용하기 위해서 preload.js를 추가함.
- https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#preload-files