const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const url = require('url');

const isDev = require('electron-is-dev');

const makeMenuTemplate = require('../Utility/MenuCreator');
const { registerEvents } = require('../Utility/Helpers');
const SnippetEvents = require('../events/SnippetEvents');
const ProjectEvents = require('../events/ProjectEvents');
const AppEvents = require('../events/AppEvents');
const MenuEvents = require('../events/MenuEvents');
const { migrate } = require('../db/migrate');

// migrate()

try {
  require('electron-reloader')(module);
} catch (_) {}

process.env.NODE_ENV = '';

let mainWindow;
let mainMenu;
const isMac = process.platform === 'darwin';

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => (mainWindow = null));
};
const queueEventToRegister = () => {
  registerEvents(new SnippetEvents());
  registerEvents(new ProjectEvents());
  registerEvents(new AppEvents());
  createMainWindow();
  console.log(mainWindow);
  mainMenu = Menu.buildFromTemplate(makeMenuTemplate(mainWindow));
  Menu.setApplicationMenu(mainMenu);
};

app.on('ready', queueEventToRegister);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// test stuff
// ipcMain.handle('addProject', () => {
//   // create new Window
//   addWindow = new BrowserWindow({
//     width: 300,
//     height: 200,
//     title: 'Add Item',
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   });
//   // LOAD THE HTML FILE
//   addWindow.loadURL(
//     url.format({
//       pathname: path.join(__dirname, 'addWindow.html'),
//       protocol: 'file',
//       slashes: true,
//     })
//   );

//   addWindow.on('closed', function () {
//     addWindow = null;
//   });
// });

// ipcMain.handle('addProjectToMain', (e, input) => {
//   console.log(input);
//   mainWindow.webContents.send('addProjectMain', input);
//   addWindow.close();
// });
