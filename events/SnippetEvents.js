const { ipcMain } = require('electron');
const SnippetController = require('../controller/SnippetController');

class SnippetEvents {
  getSnippets() {
    return SnippetController.getSnippets();
  }
  addSnippet(snippet) {
    console.log(`SnippetEventClass ${snippet.data}`);
    SnippetController.addSnippet(snippet);
    return SnippetController.getSnippets();
  }
  editSnippet(snippet) {
    if (snippet.id === 'new') {
      console.log('hgi');
      return SnippetController.addSnippet(snippet);
    } else {
      return SnippetController.editSnippet(snippet);
    }
  }
}

module.exports = SnippetEvents;
