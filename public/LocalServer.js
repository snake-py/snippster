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

migrate()

// try {
//   require('electron-reloader')(module);
// } catch (_) {}

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
  mainMenu = Menu.buildFromTemplate(makeMenuTemplate(mainWindow, addWindowFunc, new MenuEvents()));
  Menu.setApplicationMenu(mainMenu);
};

app.on('ready', queueEventToRegister);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const addWindowFunc = (menuEvents) => {
  let addWindowIsOpen = false;
  const wins = BrowserWindow.getAllWindows();
  for (const key in wins) {
    if (wins[key].name === 'PROJECT_ADD_WINDOW') {
      addWindowIsOpen = true;
      wins[key].focus();
    }
  }
  if (!addWindowIsOpen) {
    let addWindow = new BrowserWindow({
      width: 500,
      height: 400,
      title: 'Add Item',
      webPreferences: {
        nodeIntegration: true,
      },
    });
    addWindow.name = 'PROJECT_ADD_WINDOW';
    // addWindow.setMenu(null);
    // LOAD THE HTML FILE
    addWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../public/templates/addProjectWindow/addWindow.html'),
        protocol: 'file',
        slashes: true,
      })
    );

    addWindow.on('closed', function () {
      ipcMain.removeHandler('addProjectToMain');
      addWindow = null;
    });

    ipcMain.handle('addProjectToMain', (e, input) => {
      let project = menuEvents.addProject(input);
      if (project) {
        mainWindow.webContents.send('addProjectMain', project);
        addWindow.close();
      } else {
        addWindow.webContents.send('projectTitleIsNotUnique');
      }
    });
  }
};
