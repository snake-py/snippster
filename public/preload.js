const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipcRenderer', {
  invoke: (eventName, obj) => ipcRenderer.invoke(eventName, obj),
  on: (listener, callback) => ipcRenderer.on(listener, callback),
})