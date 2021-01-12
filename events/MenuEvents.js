const ProjectController = require('../controller/ProjectController');
const fs = require('fs');
const { app } = require('electron');
const isDev = require('electron-is-dev');

class MenuEvents {
  addProject(data) {
    data.title.replace('/', '');
    data.title.replace('\\', '');
    console.log(data);
    console.log(app.getPath('userData'));
    console.log(app.getPath('pictures'));
    if (data.icon !== '') {
      const prefix = new Date().valueOf();
      // if (!fs.existsSync('./user/projects/icon')) {
      //   fs.mkdir('./user/projects/icon', { recursive: true }, (e) => {
      //     console.log(e);
      //   });
      // }
      fs.copyFile(data.icon, `${app.getPath('userData')}/${data.title}_${prefix}.svg`, (err) => {
        console.log(err);
      });
      // fs.copyFile(data.icon, isDev ? `./src/user/projects/icon/${data.title}_${prefix}.svg` : path.join(app.getPath('userData'), '/snippster/project', `${data.title}_${prefix}.svg`), (err) => {
      // data.icon = isDev ? `${data.title}_${prefix}.svg` : path.join(app.getPath('userData'), '/snippster/project', `${data.title}_${prefix}.svg`);
      data.icon = `${data.title}_${prefix}.svg`;
    }
    console.log(data);
    if (!ProjectController.isProjectInDB(data)) {
      const project = ProjectController.addProject(data);
      console.log('____________');
      console.log(project.icon);
      return project;
    } else {
      return false;
    }
  }
}

module.exports = MenuEvents;
