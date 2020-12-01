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
    // return SnippetController.getSnippets();
  }
  filterSnippets(data) {
    const command = data.query.slice(0, 2);
    console.log(data.query.slice(3));
    console.log(command);
    if (command === '/g') {
      console.log('run global');
      console.log(data.query.slice(3));
      return SnippetController.filterSnippetsGlobal(data.query.slice(3));
    }
    return SnippetController.filterSnippets(data.query, data.project.id);
  }
}

module.exports = SnippetEvents;
