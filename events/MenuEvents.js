const SnippetController = require('../controller/SnippetController');
const ProjectController = require('../controller/ProjectController');


class MenuEvents {
  addProject(data) {
    return ProjectController.addProject(data);
  }
}

module.exports = MenuEvents;
