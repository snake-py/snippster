const ProjectController = require('../controller/ProjectController');
const fs = require('fs');

class MenuEvents {
  addProject(data) {
    if (data.icon !== '') {
      fs.copyFile(data.icon, `./user/files/projects/icon/${data.title}.svg`, (err) => {
        console.log(err);
      });
      data.icon = `${data.title}.svg`;
    }
    console.log(data);
    if (!ProjectController.isProjectInDB(data)) {
      return ProjectController.addProject(data);
    } else {
      return false;
    }
  }
}

module.exports = MenuEvents;
