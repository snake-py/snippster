const MenuEvents = require('../events/MenuEvents');
const isMac = process.platform === 'darwin';
const { BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');
function makeMenuTemplate(mainWindow, addWindowFunc, menuEvents) {
  // let addWindow;
  // const menuEvents = new MenuEvents();
  const mainMenuTemplate = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideothers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        {
          label: 'Add Project',
          click() {
            addWindowFunc(menuEvents)
          },
        },
        {
          label: 'Delete Project',
          click() {
            mainWindow.webContents.send('menuDeleteProject');
          },
        },
        {
          label: 'Add Snippet',
          accelerator: isMac ? 'Command+SHIFT+A' : 'ctrl+shift+a',
          click() {
            mainWindow.webContents.send('menuAddSnippet');
          },
        },
        {
          label: 'Save Snippet',
          accelerator: isMac ? 'Command+S' : 'ctrl+s',
          click() {
            mainWindow.webContents.send('menuSaveSnippet');
          },
        },
        {
          label: 'Delete Snippet',
          click() {
            mainWindow.webContents.send('menuDeleteSnippet');
          },
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
              },
            ]
          : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
      ],
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [{ type: 'separator' }, { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { type: 'separator' }, { role: 'togglefullscreen' }],
    },
    // { role: 'windowMenu' }
    {
      label: 'Navigation',
      submenu: [
        {
          label: 'Project Query',
          accelerator: isMac ? 'Command+q' : 'ctrl+q',
          click() {
            mainWindow.webContents.send('menuQueryProject');
          },
        },
        {
          label: 'Global Query',
          accelerator: isMac ? 'Command+shift+q' : 'ctrl+shift+q',
          click() {
            mainWindow.webContents.send('menuQueryGlobal');
          },
        },
        { type: 'separator' },
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }] : [{ role: 'close' }]),
      ],
    },
  ];
  // IF MAC PUSH EMPTY OBJECT TO MENU
  if (isMac) {
    mainMenuTemplate.unshift({});
  }
  if (process.env.NODE_ENV != 'production') {
    mainMenuTemplate.push({
      label: 'DeveloperTools',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: isMac ? 'Command+i' : 'ctrl+i',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          },
        },
        { role: 'reload' },
        { role: 'forceReload' },
      ],
    });
  }
  return mainMenuTemplate;
}

// Add developer tools item if not in production

module.exports = makeMenuTemplate;
