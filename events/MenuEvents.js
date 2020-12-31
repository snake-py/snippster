const ProjectController = require('../controller/ProjectController');

class MenuEvents {
  addProject(data) {
    if (!ProjectController.isProjectInDB(data)) {
      return ProjectController.addProject(data);
    } else {
      return false;
    }
  }
}

module.exports = MenuEvents;
