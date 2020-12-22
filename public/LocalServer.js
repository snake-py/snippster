const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain, globalShortcut  } = electron;
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

const isMac = process.platform === 'darwin';
const creatMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 700,
    // frame: false,
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

  // globalShortcut.register('Alt+CommandOrControl+I', () => {
  //   console.log('Electron loves global shortcuts!')
  // })
  creatMainWindow();
};

app.on('ready', queueEventToRegister);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



// test stuff
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


//const mainMenuTemplate = [
  // // { role: 'appMenu' }
  // ...(isMac
  //   ? [
  //       {
  //         id: 5,
  //         label: app.name,
  //         submenu: [
  //           { role: 'about' },
  //           { type: 'separator' },
  //           { role: 'services' },
  //           { type: 'separator' },
  //           { role: 'hide' },
  //           { role: 'hideothers' },
  //           { role: 'unhide' },
  //           { type: 'separator' },
  //           { role: 'quit' },
  //         ],
  //       },
  //     ]
  //   : []),
  // // { role: 'fileMenu' }
  // {
  //   label: 'File',
  //   submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
  // },
  // // { role: 'editMenu' }
  // {
  //   label: 'Edit',
  //   submenu: [
  //     { role: 'undo' },
  //     { role: 'redo' },
  //     { type: 'separator' },
  //     { role: 'cut' },
  //     { role: 'copy' },
  //     { role: 'paste' },
  //     ...(isMac
  //       ? [
  //           { role: 'pasteAndMatchStyle' },
  //           { role: 'delete' },
  //           { role: 'selectAll' },
  //           { type: 'separator' },
  //           {
  //             label: 'Speech',
  //             submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
  //           },
  //         ]
  //       : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
  //   ],
  // },
  // // { role: 'viewMenu' }
  // {
  //   label: 'View',
  //   submenu: [
  //     { role: 'reload' },
  //     { role: 'forceReload' },
  //     { role: 'toggleDevTools' },
  //     { type: 'separator' },
  //     { role: 'resetZoom' },
  //     { role: 'zoomIn' },
  //     { role: 'zoomOut' },
  //     { type: 'separator' },
  //     { role: 'togglefullscreen' },
  //   ],
  // },
  // // { role: 'windowMenu' }
  // {
  //   label: 'Window',
  //   submenu: [{ role: 'minimize' }, { role: 'zoom' }, ...(isMac ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }] : [{ role: 'close' }])],
  // },
  // {
  //   role: 'help',
  //   submenu: [
  //     {
  //       label: 'Learn More',
  //       click: async () => {
  //         const { shell } = require('electron');
  //         await shell.openExternal('https://electronjs.org');
  //       },
  //     },
  //   ],
  // },
//];

// const menu = Menu.buildFromTemplate(mainMenuTemplate);
// Menu.setApplicationMenu(menu);
