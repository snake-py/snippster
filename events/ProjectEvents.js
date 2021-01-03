const ProjectController = require('../controller/ProjectController');

class ProjectEvents {
  getProjects() {
    return { all: ProjectController.getProjects(), toActivate: ProjectController.getLastInsertedProject() };
  }
  deleteProject(project) {
    if (ProjectController.deleteProject(project)) {
      return { remaining: ProjectController.getProjects(), toActivate: ProjectController.getLastInsertedProject() };
    }
  }
  getLastProject() {
    return ProjectController.getLastInsertedProject();
  }
}

module.exports = ProjectEvents;
