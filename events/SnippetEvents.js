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
  deleteSnippet(snippet) {
    SnippetController.deleteSnippet(snippet)
    // return SnippetController.getSnippets();
  }
}

module.exports = SnippetEvents;
