const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const isDev = require('electron-is-dev');
const { registerEvents } = require('../Utility/Helpers');
const SnippetEvents = require('../events/SnippetEvents');
const {migrate} = require('../db/migrate')


migrate()



try {
  require('electron-reloader')(module);
} catch (_) {}


let mainWindow;

const queueEventToRegister = () => {
  registerEvents(new SnippetEvents());
};

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
};

app.on('ready', creatMainWindow);
app.on('ready', queueEventToRegister);

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
