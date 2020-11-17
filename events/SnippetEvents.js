const { ipcMain } = require('electron');
const SnippetController = require('../controller/SnippetController');

class SnippetEvents {
  getSnippets() {
    return SnippetController.getSnippets()
  }
   addSnippet(snippet) {
     console.log(`SnippetEventClass ${snippet.data}`);
    SnippetController.addSnippet(snippet)
    return SnippetController.getSnippets()
  }
}

module.exports = SnippetEvents;
