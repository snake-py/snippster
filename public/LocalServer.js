const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const url = require('url');

const isDev = require('electron-is-dev');
const { registerEvents } = require('../Utility/Helpers');
const SnippetEvents = require('../events/SnippetEvents');
const ProjectEvents = require('../events/ProjectEvents');
const AppEvents = require('../events/AppEvents');
const { migrate } = require('../db/migrate');

// migrate()

// try {
//   require('electron-reloader')(module);
// } catch (_) {}

let mainWindow;
let addWindow;

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
const queueEventToRegister = async () => {
  await registerEvents(new SnippetEvents());
  await registerEvents(new ProjectEvents());
  await registerEvents(new AppEvents());
  creatMainWindow();
};

app.on('ready', queueEventToRegister);
// app.on('ready', creatMainWindow);

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

ipcMain.handle('addProject', () => {
  // create new Window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Item',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // LOAD THE HTML FILE
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'addWindow.html'),
      protocol: 'file',
      slashes: true,
    })
  );
  
  addWindow.on('closed', function () {
    addWindow = null;
  });
});

ipcMain.handle('addProjectToMain', (e, input) => {
  console.log(input);
  mainWindow.webContents.send('addProjectMain', input);
  addWindow.close();
});
