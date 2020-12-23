
class MenuEvents {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  addSnippet() {
      console.log('moin');
    this.mainWindow.webContents.send('menuAddSnippet', 'Hi from menuEvents');
  }
}


module.exports = MenuEvents;
