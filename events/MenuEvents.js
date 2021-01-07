const ProjectController = require('../controller/ProjectController');
const fs = require('fs');
const path = require('path');


class MenuEvents {
  addProject(data) {
    console.log(data);
    if (data.icon !== '') {
      const prefix = new Date().valueOf()
      fs.copyFile(data.icon, `./user/files/projects/icon/${data.title}_${prefix}.svg`, (err) => {
        console.log(err);
      });
      // data.icon = path.join(__dirname, `../user/files/projects/icon/${data.title}_${prefix}.svg`);
      data.icon = `${data.title}_${prefix}.svg`;
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
