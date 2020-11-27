const { ipcMain } = require('electron');
const SnippetController = require('../controller/SnippetController');

class SnippetEvents {
  getSnippets() {
    return SnippetController.getSnippets();
  }
  addSnippet() {
    return SnippetController.addSnippet();
  }
  editSnippet(snippet) {
    return SnippetController.editSnippet(snippet);
  }
}

module.exports = SnippetEvents;
