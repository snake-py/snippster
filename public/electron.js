const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain, protocol } = electron;
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

const { autoUpdater } = require('electron-updater');
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.on('checking-for-update', () => {
  console.log('Checking for updates');
});
autoUpdater.on('update-available', (info) => {
  console.log('Update Available');
  console.log('Version', info.version);
  console.log('Release Date', info.releaseDate);
});
autoUpdater.on('update-not-available', () => {
  console.log('Update Not Available');
});
autoUpdater.on('download-progress', (progress) => {
  console.log(`Progress ${Math.floor(progress.perecent)}`);
});
autoUpdater.on('update-downloaded', (info) => {
  console.log('Update downloaded');
  autoUpdater.quitAndInstall();
});
autoUpdater.on('error', (error) => {
  console.error(error);
});

migrate();
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
      webSecurity: false,
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `
  ${url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file',
    slashes: true,
  })}`
  );
  mainWindow.on('closed', () => (mainWindow = null));
};
const queueEventToRegister = () => {
  registerEvents(new SnippetEvents());
  registerEvents(new ProjectEvents());
  registerEvents(new AppEvents());
  createMainWindow();
  mainMenu = Menu.buildFromTemplate(makeMenuTemplate(mainWindow, addWindowFunc, new MenuEvents()));
  Menu.setApplicationMenu(mainMenu);
  if (!isDev) {
    autoUpdater.checkForUpdates();
  }
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
      isDev
        ? `
        ${url.format({
          pathname: path.join(__dirname, './templates/addProjectWindow/addWindow.html'),
          protocol: 'file',
          slashes: true,
        })}
      `
        : `
      ${url.format({
        pathname: path.join(__dirname, '../build/templates/addProjectWindow/addWindow.html'),
        protocol: 'file',
        slashes: true,
      })}
      `
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

ipcMain.handle('isDev', () => {
  return { isDev: isDev, userData: app.getPath('userData') };
});

app.whenReady().then(() => {
  protocol.registerFileProtocol('root', (request, callback) => {
    const url = request.url.substr(7);
    callback({ path: app.getPath('userData') });
  });
});

