const ProjectController = require('../controller/ProjectController');

class ProjectEvents {
  getProjects() {
    return ProjectController.getProjects();
  }

}

module.exports = ProjectEvents;
