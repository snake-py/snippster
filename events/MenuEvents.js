const ProjectController = require('../controller/ProjectController');
const fs = require('fs');
const { app } = require('electron');
const isDev = require('electron-is-dev');

class MenuEvents {
  addProject(data) {
    console.log(process.env.DEV_APP_PATH);
    if (data.icon !== '') {
      const prefix = new Date().valueOf();
      try {
        fs.copyFile(data.icon, process.env.IS_PUBLISHED ? `${app.getPath('userData')}/${data.title}_${prefix}.svg` : `${process.env.DEV_APP_PATH}/${data.title}_${prefix}.svg` , (err) => {
          console.log(err);
        });
      } catch (error) {
        return false;
      }
      data.icon = `${data.title}_${prefix}.svg`;
    }
    if (!ProjectController.isProjectInDB(data)) {
      return ProjectController.addProject(data);
    } else {
      return false;
    }
  }
}

module.exports = MenuEvents;
