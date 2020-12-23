const { Menu } = require('electron');
const isMac = process.platform === 'darwin';
const menuEvents = require('../public/LocalServer');

console.log('menuEvents');
console.log(menuEvents);

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
          console.log('Add');
          // menuEvents.addProject()
        },
      },
      {
        label: 'Delete Project',
        click() {
          console.log('Delete');
          // menuEvents.addProject()
        },
      },
      {
        label: 'Add Snippet',
        accelerator: isMac ? 'Command+SHIFT+A' : 'ctrl+shift+a',
        click() {
          console.log('Add Snippet');
          console.log(menuEvents);
          menuEvents.addSnippet()
        },
      },
      {
        label: 'Save Snippet',
        accelerator: isMac ? 'Command+S' : 'ctrl+s',
        click() {
          console.log('Save Snippet');
          // menuEvents.addProject()
        },
      },
      {
        label: 'Delete Snippet',
        click() {
          console.log('Delete Snippet');
          // menuEvents.addProject()
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
          console.log('focus query tool');
        },
      },
      {
        label: 'Global Query',
        accelerator: isMac ? 'Command+shift+q' : 'ctrl+shift+q',
        click() {
          console.log('focus global query tool');
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

// Add developer tools item if not in production
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

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
module.exports = mainMenu;
