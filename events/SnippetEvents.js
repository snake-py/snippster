const { ipcMain } = require('electron');
const SnippetController = require('../controller/SnippetController');

class SnippetEvents {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }
  getSnippets() {
    ipcMain.on('get:snippets', () => {
        this.mainWindow.webContents.send('get:snippets', SnippetController.get_snippets());
    });
    
  }
}


module.exports = SnippetEvents