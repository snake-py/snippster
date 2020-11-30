const SnippetController = require('../controller/SnippetController');

class SnippetEvents {
  getSnippets(project_id) {
    return SnippetController.getSnippets(project_id);
  }
  addSnippet(project_id) {
    return SnippetController.addSnippet(project_id);
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
