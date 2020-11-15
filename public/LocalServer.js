const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const isDev = require('electron-is-dev');
const { registerEvents } = require('../Utility/Helpers');
const SnippetEvents = require('../events/SnippetEvents')
// const fs = require('fs'); // reads json file


try {
  require('electron-reloader')(module);
} catch (_) {}

let mainWindow;

const creatMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => (mainWindow = null));
  console.log('MAIN WINDOW LOAD');
  se = new SnippetEvents(mainWindow)
  // console.log(se);
  se.getSnippets()
};

app.on('ready', creatMainWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (creatMainWindow === null) {
    createWindow();
  }
});


// ipcMain.on('get:snippets', () => {
//   mainWindow.webContents.send('get:snippets', getSnippets());
// })
// const getSnippets = () => {
//   return JSON.parse(fs.readFileSync('db/snippets.json'));
// };