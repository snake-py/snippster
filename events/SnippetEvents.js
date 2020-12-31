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
    SnippetController.deleteSnippet(snippet);
  }
  filterSnippets(data) {
    const command = data.query.slice(0, 2);
    if (command === '/g') {
      return SnippetController.filterSnippetsGlobal(data.query.slice(3));
    }
    return SnippetController.filterSnippets(data.query, data.project.id);
  }
}

module.exports = SnippetEvents;
